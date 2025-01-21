const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const app = express();
const jwt=require("jsonwebtoken");
const { User } = require("./db/database");
const JWT_SECRET=require("./config")

app.use(cors());
app.use(express.json());

app.post("/me",(req, res) => {
  const token=req.body.token;
  console.log("Token from localStorage",token)


  if(!token){
    res.json({
      message:"Token is required!"
    })
    return;
  }

  jwt.verify(token,JWT_SECRET,async(err,decode)=>{
    if(err){
      console.log("JWT ERROR",err)
      res.json({message: 'Invalid or expired token', error: err.message})
      return
    }

    const userId=decode.userId;
    try{
      const userExists=await User.find({
        _id:userId
      })

      if(!userExists){
        console.log("User does not exist!");
        res.json({ isAuth: false });
        return;
      }else{
        console.log("User authenticated!");
        res.json({ isAuth: true });
        return;
      }
    }catch(err){
      console.error("Database error:", err);
      res.json({ message: "Server error",error:err.message });
      return;
    }
  })

  // const response=jwt.verify(token,JWT_SECRET,(err,decoded)=>{
  //   if(err){
  //     console.error('JWT Error:', err);
  //     res.status(401).json({ message: 'Invalid or expired token', error: err.message });
  //     return;
  //   }
  //   req.user = decoded;
  //   return
  // });
  // console.log("Verification is:",response)


  // const userExists=await User.find({
  //   _id:response.userId
  // })

  // console.log("Existing user:",userExists)

  // if(!userExists){
  //   console.log("hello false!")
  //   res.json({
  //     isAuth:false
  //   })
  //   return;
  // }else{
  //   console.log("hello true!")
  //   res.json({
  //     isAuth:true
  //   })
  //   return;
  // }
});

app.use("/api/v1/", mainRouter);

app.listen(3000);
