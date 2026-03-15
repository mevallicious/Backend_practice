import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/email.service.js";

export async function registerUser(req,res){
    const {email,username,password} = req.body

    const isAlreadyuser = await userModel.findOne({
        $or:[ {email},{username} ]
    })

    if(isAlreadyuser){
        return res.status(400).json({
            message:"user already exists"
        })
    }

    const user = await userModel.create({
        password,email,username
    })

    await sendEmail({
        to:email,
        subject:"Welcome to Vandru AI",
        html:`
            <p><h1>Hi ${username}</h1></p>
            <p>Thankyou for registering at <strong>Vandru AI</strong>,we are excited to have you on board!</p>
            <p>Best regards,<br>The Vandru Ai Team<br>`
    })

    // const token = jwt.sign(
    //     {id:user._id,username:user.username},
    //     process.env.JWT_KEY,
    //     {expiresIn:"1d"}
    // )

    res.status(201).json({
        message:"user created successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
    })
}

export async function loginUser(req,res){
    const {username,email,password}=req.body

    const user = await userModel.findOne({
        $or:[
            {email},{username}
        ]
    }).select("+password")

    if(!user){
        return res.status(404).json({
            message:"invalid credentials"
        })
    }

    const isPasswordValid = 0

    if(!isPasswordValid){
        return res.status(404).json({
            message:"invalid credentials"
        })
    }

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_KEY,
        {expiresIn:"1d"}
    )

    res.status(201).json({
        message:"user created successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
        token
    })
}