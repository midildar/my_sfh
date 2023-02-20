import jwt from "jsonwebtoken"

export const verifyToken = async (req,res,next)=>{
    try {
        //console.log(req.headers.authorization)
        let token = req.headers.authorization

        if (!token) return res.status(403).json("Access denied")
        
        const verified = jwt.verify(token , process.env.JWT_SECRET)
        console.log(verified)
        req.user = verified;
        next()
    } catch (err) {
        res.status(500).json({error : err.message})
    }
}