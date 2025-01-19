const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://shravanchinchkar:Shravan%40132610@shrav.wg75m.mongodb.net/payTM")

//following is the schema for the User table
const userSchema=mongoose.Schema({
    userName:String,
    password:String,
    firstName:String,
    lastName:String
})

//following is the schema for tha Accout table
const accountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    balance:{
        type:Number,
        require:true
    }
})

const User=mongoose.model("user",userSchema)
const Account=mongoose.model("account",accountSchema);

module.exports={
    User,
    Account
}