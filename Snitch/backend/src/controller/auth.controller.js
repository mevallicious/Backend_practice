import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message){
    const token =jwt.sign({
        id:user._id,
    },config.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token)


    res.status(200).json({
        message,
        success:true,
        token,
        user:{
            id:user._id,
            email:user.email,
            contact:user.contact,
            fullname:user.fullname,
            role:user.role
        }
    })
}

export const register = async(req,res)=>{
    const {email,contact,password,fullname,isSeller} =req.body

    try{
        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })

        if(existingUser){
            return res.status(400).json({message:"user with email or contact already exists"})
        }

        const user = await userModel.create({
            email,contact,password,fullname,role:isSeller ? "seller" :"buyer"
        })

        await sendTokenResponse(user,res,"User registered successfully")

    }catch(err){
        console.log(err)
        return  res.status(500).json({ message:"Server error" })
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }

    await sendTokenResponse(user,res,"User logged in successfully")
}