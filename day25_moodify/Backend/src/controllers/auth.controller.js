const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const blacklistModel = require("../model/blacklist.model")
const redis = require("../config/cache")

async function registerUser(req,res){
    const {username,password,email} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists with the same username or email"
        })
    }

    const hash =await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,email,password:hash
    })


    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function loginUser(req,res){
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid credentials"
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
            username:user.username,
            id:user._id,
            email:user.email
        }
    })
}

async function getMe(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user fetched successfully",
        user
    })
}

async function logoutUser(req,res){
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token,Date.now().toString(),"EX",24*60*60)

    res.status(200).json({
        message:"user is logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}