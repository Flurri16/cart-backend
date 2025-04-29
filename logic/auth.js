import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '../models/User.js'
export const register = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "User already exist."})
        const salt = bcryptjs.genSaltSync(8)
        const hash = bcryptjs.hashSync(password, salt)
        const newUser = new User({
            email, password: hash
        })
        await newUser.save()
        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
        return res.json({newUser, message: "User was created.", token})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "Back register err"})
    }
}
export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "User is not found."})
        const isPasswordCorrect = bcryptjs.compareSync(password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Password is not correct."})
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
        return res.json({user, message: "You was loggined.", token})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "Back login err"})
    }
}
export const getMe = async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) return res.status(403).json({message: "Eror getme"})
        const {password, ...userData} = user._doc
        return res.json({ user: userData})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "Error back me"})
    }
}