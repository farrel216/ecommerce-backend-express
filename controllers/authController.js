const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).send({ message: "Email tidak terdaftar" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
            const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" });
            User.updateOne({ _id: user._id }, { refresh_token: refreshToken }).then(() => {
                res.cookie('refreshToken', refreshToken, { httpOnly: true,secure:true, SameSite:'none',maxAge: 3600000});
                res.status(200).send({ message: "Login berhasil", accessToken});
            }).catch((error) => {
                res.status(500).send({ message: "Login gagal", error });
            });
        }
        else{
            return res.status(400).send({ message: "Password salah" });

        }
    });
}

const register = async (req,res) => {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "Email sudah terdaftar" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await User.create({
        email,
        name,
        password: hashPassword,
      }).then(() => {
        res.status(200).send({ message: "Register berhasil" });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (req, res) => {
    const token = req.cookies['refreshToken'];
    if(!token) return res.status(204).send({message:"No Content"})
    const user = await User.findOne({refresh_token:token})
    if(user){
      await User.updateOne({ _id: user._id }, { refresh_token: null }).then(() => {
        res.clearCookie('refreshToken');
        res.status(200).send({ message: "Logout berhasil"});
      })
  }
  }


  module.exports = {register,login,logout}