const express =require("express")
const postRouter=express.Router()
const postController =require("../controller/post.controller")
const multer =require("multer")
const upload = multer({storage:multer.memoryStorage()})

/**
 * POST /api/posts [protected] -only those user can access who have a valid token
 * - req.body {caption,image-file}
 */
postRouter.post("/",upload.single("image"),postController.createPostController)

module.exports =postRouter