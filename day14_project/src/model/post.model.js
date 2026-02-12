const mongoose =require("mongoose")

const postSchema =new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"imgurl is required for creating a post"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        require:[true,"user id is required"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports=postModel