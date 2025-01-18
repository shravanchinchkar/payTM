const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://shravanchinchkar:Shravan%40132610@shrav.wg75m.mongodb.net/payTM")

const userSchema=mongoose.Schema({
    userName:String,
    password:String,
    firstName:String,
    lastName:String
})

const User=mongoose.model("user",userSchema)

module.exports={
    User
}