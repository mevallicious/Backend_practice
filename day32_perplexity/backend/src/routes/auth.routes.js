import { Router } from "express"
import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { getMe, loginUser, registerUser, verifyEmail } from "../controllers/auth.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"
const authRouter=Router()


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 * @body {username,password,email}
 */
authRouter.post("/register",registerValidator,registerUser)

/**
 * @route POSt /api/auth/login
 * @description Login the registered user
 * @access Public
 * @body {username,password,email}
 */
authRouter.post("/login",loginValidator,loginUser)


/**
 * @route Get /api/auth/verify-email
 * @description Verify user's email
 * @access Public
 * @query {token}
 */
authRouter.get("/verify-email",verifyEmail)

/**
 * @route Get /api/auth/get-me
 * @description  to get user's detail
 * @access Private
 */
authRouter.get("/get-me",authUser,getMe)


export default authRouter