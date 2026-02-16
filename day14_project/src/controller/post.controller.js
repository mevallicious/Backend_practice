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

async function getPostController(req,res){
    const token = req.cookies.jwt_token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    let decoded = null

    try{
        decoded =jwt.verify(token,process.env.JWT_SECRET)
    }
    catch{
        return res.status(401).json({
            message:"token is invalid"
        })
    }

    const userId = decoded.id

    const posts =await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Posts fetched Successfully",
        posts
    })
}

async function getPostDetailsController(req,res){
    const token = req.cookies.jwt_token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    let decoded =null

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch{
        return res.status(401).json({
            message:"token is invalid"
        })
    }

    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:'Post not found'
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Post not found"
        })
    }

    return res.status(200).json({
        message:"Post fetched Successfully",
        post
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}