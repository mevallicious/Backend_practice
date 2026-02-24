const express =require("express")
const postRouter =express.Router()
const identifyUser=require("../middleware/auth.middleware")
const postController =require("../controller/post.controller")
const multer = require("multer")
const upload =multer({storage:multer.memoryStorage()})

postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

postRouter.get("/",identifyUser,postController.getPostController)

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

postRouter.post("/like/:postId",identifyUser,postController.likePostController)

/**
 * @route GET api/posts/feed
 * @description to get all the post created by user
 * @access private
 */
postRouter.get("/feed",identifyUser,postController.getFeedController)

module.exports =postRouter