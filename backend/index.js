const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const app = express();
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch'); // Initialize localStorage for your server
const jwt=require("jsonwebtoken");
const { User } = require("./db/database");
const JWT_SECRET=require("./config")

app.use(cors());
app.use(express.json());


app.use("/api/v1/", mainRouter);

app.post("/me",async(req, res) => {
  const token=req.body.token;
  // console.log("Token is :",token)

  const {userId}=jwt.verify(token,JWT_SECRET);
  // console.log("Verification is:",userId)


  const userExists=await User.findOne({
    _id:userId
  })

  if(!userExists){
    res.json({
      isAuth:false
    })
    return;
  }else{
    res.json({
      isAuth:true
    })
    return;
  }
});

app.listen(3000);
