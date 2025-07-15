const jwt = require("jsonwebtoken")
const {User} = require("../models/useModel")

const authMiddleware = async (req,res,next) => {
    const token = req.header("Authorization")

    if(!token){
        return res.status(401).json({msg:"Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        const userData = await User.findOne({email:decoded.email})
        req.email = userData.email
        req.token = token
        req.user = userData
        next()
    } catch (error) {
        return res.status(401).json({msg:"Unauthorized"})
    }
}

module.exports = {authMiddleware}
