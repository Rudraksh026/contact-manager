const jwt = require("jsonwebtoken")
const {User} = require("../models/useModel")

const authMiddleware = async (req,res,next) => {
    const token = req.header("Authorization")

    if(!token){
        return res.status(401).json({msg:"Unauthorized"})
    }

    const jwttoken = token.trim()

    // console.log(process.env.JWT_KEY)
    try {
        const isVerified = jwt.verify(jwttoken, process.env.JWT_KEY) 
        const userData = await User.findOne({email:isVerified.email})
        req.email = userData.email
        req.token = jwttoken
        req.user = userData
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg:error})
    }
}

module.exports = {authMiddleware}
