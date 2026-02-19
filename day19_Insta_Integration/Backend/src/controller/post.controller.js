const postModel =require("../model/post.model")
const ImageKit =require("@imagekit/nodejs/index.js")
const {toFile} =require("@imagekit/nodejs/index.js")
const likeModel =require("../model/like.model")

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL
})

async function createPostController(req,res){   
    
    const file = await imagekit.files.upload({
        file :await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Title",
        folder:"cohort-2-instaclone-posts"
    })

    const post =await postModel.create({
        caption :req.body.caption,
        imageURL:file.url,
        user:req.user.id //from middleware
    })

    res.status(201).json({
        message:"post created succesfully",
        post
    })
}

async function getPostController(req,res){
    
    const userId =req.user.id

    const postId =await postModel.findOne({
        user:userId
    })

    res.status(200).json({
        message:"post fetched succesfully",
        posts
    })
}

async function getPostDetailsController(req,res){
    
    const userId =req.user.id
    const postId =req.params.id

    const post =await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post doesnt exists"
        })
    }

    const isValidUser = post.user.toString() ===userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Post not found"
        })
    }

    res.status(200).json({
        message:"Post fetched Successfully",
        post
    })
}

async function likePostController(req,res){
    const username=req.user.username
    const postId =req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post doesnt exists"
        })
    }

    const like = await likeModel.create({
        user:username,
        post:postId
    })

    res.status(200).json({
            message:"post liked successfully",
            like
        })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}