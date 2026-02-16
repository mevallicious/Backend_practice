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

/**
 * GET /api/posts/ [protected] -only those user can access who have a valid token
 */
postRouter.get("/",postController.getPostController)


/**
 * GET /api/posts/details/:postid [protected] -only those user can access who have a valid token
 * - return a detail about specific pst with id and also check wheather the post belong to the user who is requesting  
 */

postRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports =postRouter