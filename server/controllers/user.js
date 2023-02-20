import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

// register user 
export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body
        console.log(req.body)
        console.log(password)
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: 'Email already Exists.' })
        if (password.length <= 6) return res.status(400).json({ msg: 'Password should be atleast 6 characters long' })
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            name,email,password : passwordHash 
        })
        
        const savedUser = await newUser.save()
        res.status(201).json({savedUser,status: true});
    
    } catch (err) {
        res.status(500).json({error : err.message})
    }
}
// login user 

export const login = async (req,res) => {
    try {
        const {email,password} = req.body
        console.log(req.body)
        const user = await User.findOne({email:email})
        if (!user) return res.status(400).json({msg:"User does not exist."})

        const isMatch = await bcrypt.compare(password , user.password)
        
        if (!isMatch) return res.status(400).json({msg:"Invalid Credentials."})

        const token  = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token,user,status : true})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}