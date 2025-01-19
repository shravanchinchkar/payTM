const express=require("express");
const {authMiddleware}=require("../middleware");
const { Account } = require("../db/database");
const { default: mongoose } = require("mongoose");

const router=express.Router();

//following route is used to get the bank balance
router.get("/balance",authMiddleware,async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})

//following route is used to tranfer money
router.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const to=req.body.to;
    const amount=req.body.amount;

    console.log("To:",req.body.to);
    console.log("amount to send:",req.body.amount);

    console.log("user id:",req.userId)

    //fetch the data of the sender how will send the money
    const account=await Account.findOne({
        userId:req.userId
    }).session(session);

    console.log("senders data:",account)

    //check if the sender account is valid or not and has the sufficient balance or not
    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    //if everything is fine perform the transaction
    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session); //debit the amount from the senders account
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    //commit/end the transaction
    await session.commitTransaction();

    res.json({
        message:"Transaction Successful!"
    })
})

module.exports=router
