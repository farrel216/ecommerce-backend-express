const User = require ("../models/userModel.js");
const jwt = require("jsonwebtoken");

const refreshToken = async (req,res) => {
    try {
        const token = req.cookies['refreshToken']
        console.log(token)
        if(!token) return res.status(401).send({message:"Unauthorized"})
        const user = await User.findOne({refresh_token:token})
        if(user){
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
                if(err) return res.status(403).send(err)
                const id = decoded._id
                const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 15 });
                res.status(200).send({accessToken})
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {refreshToken};
