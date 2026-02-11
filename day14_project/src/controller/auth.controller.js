const userModel = require("../model/user.model")
const crypto = require("crypto")
const jwt =require("jsonwebtoken")

async function registerController(req,res){
    const {username,email,profileImage,bio,password} = req.body

    // const isUserExistsByEmail = await userModel.findOne({email})
    
    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message:"user already exist with same email"
    //     })
    // }

    // const isUserExistsByUsername = await userModel.findOne({ username })

    // if(isUserExistsByUsername){
    //     return res.status(409).json({
    //         message:"user already exist with same username"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ //or operator me 2 condition deni padti hai in an array
            {username},
            {email}                //efficent way hai karne ka with or operator
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists" + ( isUserAlreadyExists.email === email ? "Email Already exists" : "Username Already Exists")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token =jwt.sign({
        /**
         * -user ka data hona chahiye
         * data unique hona chahiye
         */
            id:user._id
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}

async function loginComntroller(req,res){
    const {username,email,password} = req.body
    /**
     * username
     * password
     * 
     * email
     * password
    */
    
    const user = await userModel.findOne({
        /*
        * {username:a,email:undefined,password:123}
        * matlab jab hum username a daale toh emil undefined rahegav and aisa koi email ni hoga joh undefined hai toh voh false hojayega and phir voh user ko on the basis of username dhund lega and vice versa agar username nahi diya ho and email diya ho 
        */
        $or:[
            {
                /**  condition 1 */
                username:username
            },
            {
                /**  condition 2 */
                email:email
            },
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValid = hash == user.password

    if(!isPasswordValid){
        return res.status(404).json({
            message:"invalid Password"
        })
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.status(200).json({
        message:"user logged in succesfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}