const express=require("express");
const {authMiddleware}=require("../middleware");
const { Account } = require("../db/database");
const { default: mongoose } = require("mongoose");
const zod=require("zod");

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

const transactionSchema=zod.object({
    to:zod.string(),
    amount:zod.number()
})

//following route is used to tranfer money
router.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const receviersId=req.body.to;
    const amountToBeSend=parseInt(req.body.amount);

    const filteredBody={
        to:receviersId,
        amount:amountToBeSend
    }
    const {success}=transactionSchema.safeParse(filteredBody)

    if(!success){
        return res.status(403).json({
            message:"Invalid Input!"
        })
    }
    const to=receviersId;
    const amount=amountToBeSend;

    console.log("User id of the person to whom the amount needs to be send:",req.body.to);
    console.log("Amount that need to be send:",req.body.amount);
    console.log("UserId of the sender who is going to send the money:",req.userId)

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
