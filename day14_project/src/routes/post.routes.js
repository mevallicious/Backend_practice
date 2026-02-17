const express =require("express")
const postRouter=express.Router()
const postController =require("../controller/post.controller")
const multer =require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middleware/auth.middleware")

/**
 * POST /api/posts [protected] -only those user can access who have a valid token
 * - req.body {caption,image-file}
 */
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

/**
 * GET /api/posts/ [protected] -only those user can access who have a valid token
 */
postRouter.get("/",identifyUser,postController.getPostController)


/**
 * GET /api/posts/details/:postid [protected] -only those user can access who have a valid token
 * - return a detail about specific pst with id and also check wheather the post belong to the user who is requesting  
 */

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

module.exports =postRouter