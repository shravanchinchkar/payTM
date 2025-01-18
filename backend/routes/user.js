const express=require("express");
const {User}=require("../db/database")
const zod=require("zod");
const jwt=require("jsonwebtoken");
const JWT_SECRET = require("../config");

const signupSchema=zod.object({
    username:zod.string(),
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
})

const router=express.Router();

router.post("/signup",async (req,res)=>{
    const body=req.body; //take input from the user
    const {success}=signupSchema.safeParse(body);//validate the input
    
    //check if the input is correct or not
    if(!success){
        //if not execute following code
        return res.json({
            ms:"Email already taken / Incorrect inputs"
        })
    }

    //if correct execute the following code
    //check if the user already exists
    const user=User.findOne({
        userName:body.userName
    })
    //check if the user already exists using following code,if exists return the specific message
    if(user._id){
        return res.json({
            ms:"Email already taken / Incorrect inputs"
        })
    }

    //if not create the following User
    const dbUser=await User.create(body)
    //Encode the username using jwt
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)

    return res.json({
        msg:"User created Successfully",
        token:token
    })
})

router.get("/username",(req,res)=>{
    res.send('Hello from userName')
})

module.exports=router
