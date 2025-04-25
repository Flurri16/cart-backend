import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const {username, password} = req.body
        
    } catch(err) {
        console.log(err)
        return res.json({message: "Back register err"})
    }
}
export const login = async (req, res) => {
    try {
        const {username, password} = req.body
    } catch(err) {
        console.log(err)
        return res.json({message: "Back login err"})
    }
}