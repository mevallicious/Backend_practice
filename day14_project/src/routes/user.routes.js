const express =require("express")
const userRouter=express.Router()
const userController =require("../controller/user.controller")
const identifyUser =require("../middleware/auth.middleware")

/**
 * @route POST /api/users/follow/:userId
 * @description follow a user
 * @access Private
 */
userRouter.post("/follow/:username",identifyUser,userController.followUserController)


/**
 * @route POST /api/users/unfollow/:userId
 * @description unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

module.exports =userRouter