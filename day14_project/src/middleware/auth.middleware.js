const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
    const token = req.cookies.jwt_token

    if(!token){
        return res.status(401).json({
            message:"Token not provided,Unauthorized access"
        })
    }

    let decoded =null

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch{
        return res.status(404).json({
            message:"user is unauthorized"
        })
    }

    req.user =decoded

    next()
}

module.exports = identifyUser
