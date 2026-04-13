import userModel from "../model/user.model";
import jwt from "jsonwebtoken"


async function sendTokenResponse(){
    const token =jwt.sign({
        id:user._id,
    },config.JWT_SECRET)
}

export const register = async(req,res)=>{
    const {email,contact,password,fullname} =req.body

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
            email,contact,password,fullname
        })



    }catch(err){
        console.log(err)
        return  res.status(500).json({ message:"Server error" })
    }
}