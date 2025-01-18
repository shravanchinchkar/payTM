const express=require("express");
const { route } = require("./user");

const router=express.Router();

router.get("/",(req,res)=>{
    res.send('Hello from user')
})

router.get("/username",(req,res)=>{
    res.send('Hello from userName')
})

module.exports=router
