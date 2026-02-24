const express = require("express")

const authRouter = express.Router()
const authController=require("../controller/auth.controller")
const identifyUser = require("../middleware/auth.middleware")

authRouter.post("/register",authController.registerController)

authRouter.post("/login",authController.loginController)

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's info
 * @access private
 */
authRouter.get("/get-me",identifyUser,authController.getMeController)

module.exports = authRouter