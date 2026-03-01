const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

userSchema.pre("save",function (next) { })
userSchema.post("save",function (next) { })

const userModel = mongoose.model("users",userSchema)

module.exports =userModel