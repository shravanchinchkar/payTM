const express = require("express");
const { User, Account } = require("../db/database");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");
const router = express.Router();

//following are the zod schema which are equired

//zod schema for validating signup route
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

//zod schema for validating signin route
const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

//zod schema for updating the user details
const updateBody = zod.object({
  firstName: zod.string().optional(), //here optional means the body may contain firstName or lastName or password or everything
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

//following is the signup route
router.post("/signup", async (req, res) => {
  const body = req.body; //take input from the user
  console.log("body is:", body);

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
  const existinguser = await User.findOne({
    username: body.username,
  });
  console.log("User Present already exists:", existinguser);

  //check if the user already exists using following code,if exists return the specific message
  if (existinguser) {
    return res.status(411).json({
      message: "User Already exists!",
    });
  }

  //if not create the following User
  const dbUser = await User.create(body);

  if (!dbUser) {
    res.status(500).json({
      message: "Something went wrong while creating a user!",
    });
  }

  //gets the userId to create a bankAccount for that specific user
  const userId = dbUser._id;

  const userAccount = await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  if (!userAccount) {
    res.status(500).json({
      message: "Something went wrong while creating user bankAccount!",
    });
  }

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

//following is signin route
router.post("/signin", async (req, res) => {
  const body = req.body; //take the login info. from the user
  console.log("bpdy is")
  const { success } = signinSchema.safeParse(body); //validate the user input

  //if inputs are incorrect return the error message
  if (!success) {
    res.json({
      message: "Incorrect inputs",
    });
    return
  }

  //if correct check whether the user exists in the db
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });

  //if user exists then
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }else{
    // return res.status(411).json({
    //   message: "Error while logging in",
    // });
    res.json({
      message:"Error while logging in"
    })
    return;
  }
  
});

//following is the route to update firstName,lastName and password
router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateBody.safeParse(body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne(
    {
      _id: req.userId,
    },
    body
  );

  return res.json({
    message: "Updated successfully",
  });
});

//gets the users from backend
router.get("/bulk", async (req, res) => {
  const filter =req.query.filter || "";
  const finalFilter=filter.charAt(0).toUpperCase() +filter.slice(1)

  //folllowing code says that if the substring present in the filter variable matches with either firstname or lastname return the user
  const filterUsers = await User.find({
    $or: [
      {
        firstName: {
          $regex: finalFilter,
        },
      },
      {
        lastName: {
          $regex: finalFilter,
        },
      },
    ],
  });
  res.json({
    user: filterUsers.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/loginuser",authMiddleware,async(req,res)=>{
  const userId=req.userId;
  const requiredUser=await User.findOne({
    _id:userId
  })
  const requireBalance=await Account.findOne({
    userId:userId
  })
  
  res.json({
    user:requiredUser,
    balance:requireBalance
  })
  return;
})

module.exports = router;
