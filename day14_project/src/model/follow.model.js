const mongoose = require("mongoose")

const followSchema = mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"users"
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"users"
    },
},
{
    timestamps:true
})

const followModel = mongoose.model("follows",followSchema)

module.exports =followModel