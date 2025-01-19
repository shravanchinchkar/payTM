const express = require("express");
const { User } = require("../db/database");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {authMiddleware}=require("../middleware")

const router = express.Router();

//zod schema for validating signup route
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

//following is the signup route
router.post("/signup", async (req, res) => {
  const body = req.body; //take input from the user
  const { success } = signupSchema.safeParse(body); //validate the input

  //check if the input is correct or not
  if (!success) {
    //if not execute following code
    return res.json({
      ms: "Incorrect inputs",
    });
  }

  //if correct execute the following code
  //check if the user already exists
  const user = User.findOne({
    userName: body.userName,
  });
  //check if the user already exists using following code,if exists return the specific message
  if (user._id) {
    return res.json({
      ms: "User Already exists",
    });
  }

  //if not create the following User
  const dbUser = await User.create(body);

  //Encode the username using jwt
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  return res.json({
    msg: "User created Successfully",
    token: token,
  });
});

//zod schema for signin route
const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

//following is the route for signin
router.post("/signin", async (req, res) => {
  const body = req.body; //take the login info. from the user
  const { success } = signinSchema.safeParse(body); //validate the user input

  //if inputs are incorrect return the error message
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  //if correct check whether the user exists in the db
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });

  //if user dose not exists return the error message
  if (user === null) {
    return res.status(411).json({
      message: "User not found!",
    });
  }

  //if user exists then
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    return res.json({
      message: "Login successfull!",
      token: token,
    });
  }
});

//zod schema for updating the user details
const updateBody=zod.object({
    firstName:zod.string().optional(), //here optional means the body may contain firstName or lastName or password or everything
    lastName:zod.string().optional(),
    password:zod.string().optional()
})

//following is the route to update firstName,lastName and password 
router.put("/",authMiddleware,async(req,res)=>{
    const body=req.body;
    const {success}=updateBody.safeParse(body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({
        _id:req.userId
    },body)

    return req.json({
        message:"Updated successfully"
    })
})


router.get("/bulk",async(req,res)=>{
    const filter=req.params.filter || "";

    //folllowing code says that if the substring present in the filter variable matches with either firstname or lastname return the user
    const users=User.findOne({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map((user)=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })

})


module.exports = router;
