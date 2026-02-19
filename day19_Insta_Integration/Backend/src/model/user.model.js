const mongoose =require("mongoose")

const userSchema =mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/wc7ak3mbr/avatar-default-user-profile-icon-simple-flat-vector-57234190.webp"
    },
})

const userModel =mongoose.model("users",userSchema)

module.exports =userModel