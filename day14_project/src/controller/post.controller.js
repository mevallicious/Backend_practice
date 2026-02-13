const postModel =require("../model/post.model")
const ImageKit =require("@imagekit/nodejs")
const { toFile} = require("@imagekit/nodejs")
const jwt= require("jsonwebtoken")

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL
})

async function createPostController(req,res){

    const token = req.cookies.jwt_token

    if(!token){
        return res.status(401).json({
            message:"Token not provided,Unauthorized access"
        })
    }

    let decoded =null

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch{
        return res.status(404).json({
            message:"user is unauthorized"
        })
    }

    console.log(decoded)

    const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder:"cohort-2-instaclone-posts"
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
}

module.exports = {
    createPostController
}