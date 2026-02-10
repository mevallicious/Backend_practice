const express = require("express")

const authRouter = express.Router()
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

/*
 * agar register api use karni hai toh
 * /api/auth/register hit karni hogi 
 * actually yeh prefix hai and isko kuch bhi likh sakte hai 
*/


authRouter.post("/register",async (req,res)=>{
    const {username,password,email} = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists with this email address"
        })
    }

    const user = await userModel.create({
        username,password,email
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

module.exports =authRouter