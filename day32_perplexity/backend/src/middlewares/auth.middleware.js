import jwt from "jsonwebtoken"

export async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized",
            success:false,
            err:"No token provided"
        })
    }

    let decoded 

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded 
        
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized",
            success:false,
            err:"Invalid Token"
        })
    }
}