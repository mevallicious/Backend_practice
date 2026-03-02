const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../model/blacklist.model")
const redis = require("../config/cache")

async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    const isBlackListed = await redis.get(token)

    if(isBlackListed){
        return res.status(401).json({
            message:"Invalid token"
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded

        next()
    }
    catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }
}

module.exports = authUser