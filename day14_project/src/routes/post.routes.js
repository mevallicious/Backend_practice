const express =require("express")
const postRouter=express.Router()
const postController =require("../controller/post.controller")
const multer =require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middleware/auth.middleware")

/**
 * @route POST /api/posts [protected] -
 * @description create a post with content and image provided in the request
 * @access only those user can access who have a valid token
 */
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

/**
 * @route GET /api/posts/ [protected]
 * @description to get the all the post created by user 
 * @access only those user can access who have a valid token
 */
postRouter.get("/",identifyUser,postController.getPostController)


/**
 * @route GET /api/posts/details/:postid [protected] -
 * @description return a detail about specific pst with id and also check wheather the post belong to the user who is requesting
 * @access only those user can access who have a valid token  
 */
postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

/**
 * @route POST .api/posts/like/:postId
 * @description like a post with id provided in the request params
 * @access private
 */
postRouter.post("/like/:postId",identifyUser,postController.likePostController)

module.exports =postRouter