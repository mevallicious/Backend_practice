const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exists"],
        required:[true,,"username is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    email:{
        type:String,
        unique:[true,"user with this email already exists"],
        required:[true,,"email is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/wc7ak3mbr/avatar-default-user-profile-icon-simple-flat-vector-57234190.webp"
    },
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel