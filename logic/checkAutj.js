import jwt from 'jsonwebtoken'
export const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.json({message: "Don't have an access. Please Login."})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded) {
            req.userId = decoded._id
        } else {
            console.log("Error checkAuth")
        }
        next()
    } catch(err) {
        console.log(err)
        return res.status(401).json({message: "Token is not correct."})
    }
}