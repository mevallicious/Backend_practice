const express = require("express")
const userModel = require("../models/user.model")
const jwt =require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")

authRouter.post("/register",async (req,res)=>{
    const {username,password,email} = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists with this email address"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest('hex')

    const user = await userModel.create({
        username,password:hash,email
    })

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered successfully",
        user,
        token
    })
})

authRouter.post("/login",async(req,res)=>{
    const {email ,password} = req.body

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(404).json({
            message:"user already exists with this email address"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token =jwt.sign(
        {
        id:user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    
    res.status(201).json({
        message:"user logged in successfully",
        user,
        token
    })
})

module.exports = authRouter