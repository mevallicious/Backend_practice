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

    const emailVerificationToken = jwt.sign(
        {email:user.email},
        process.env.JWT_SECRET
    )

    await sendEmail({
        to:email,
        subject:"Welcome to Vandru AI",
        html:`
            <p><h1>Hi ${username}</h1></p>
            <p>Thankyou for registering at <strong>Vandru AI</strong>,we are excited to have you on board!</p>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
            <p>Best regards,<br>The Vandru Ai Team<br>`
    })

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
        return res.status(400).json({
            message:"invalid credentials",
            success:false,
            err:"user not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"invalid credentials",
            success:false,
            err:"Incorrect Password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message:"Pleasy verify your email before logging in",
            success:false,
            err:"Email not verified"
        })
    }

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
        success:true
    })
}

export async function verifyEmail(req,res){
    const {token} = req.query
    let decoded

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        const user  = await userModel.findOne({email:decoded.email})
        if(!user){
            return res.status(401).json({
                message:"invalid token"
            })
        }
        
        user.verified = true
        
        await user.save()
        
        const html = `
        <h1>Email Vefied Successfully</h1>
        <p>Your email has been verified. You can now login to your account</p>
        <a href="http://localhost:3000/login">Go to Login</a>
        `
        return res.send(html)
    }catch(err){
        return res.status(400).json({
            message:" Invalid or expired token",
            err:err.message,
            success:false
        })
    }
}

export async function getMe(req,res){
    const userId = req.user._id
    
    const user = await userModel.findOne({userId}).select("-password")

    if(!user){
        return res.status(404).json({
            message:"user not found",
            success:false,
            err:"User not found"
        })
    }

    res.status(200).json({
        message:"user fetched successfully",
        success:true,
        user
    })

}




