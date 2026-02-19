const express =require("express")
const userRouter =express.Router()
const identifyUser =require("../middleware/auth.middleware")
const userController =require("../controller/user.controller")

userRouter.post("/follow/:username",identifyUser,userController.followUserController)

userRouter.get("/follow/requests", identifyUser, userController.getFollowRequestsController)
userRouter.patch("/follow/accepted/:username",identifyUser,userController.acceptFollowerController)
userRouter.delete("/follow/rejected/:username",identifyUser,userController.rejectFollowerController)

userRouter.post("/unfollow/:username",identifyUser,userController.followUserController)


module.exports =userRouter