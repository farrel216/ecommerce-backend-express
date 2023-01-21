const User = require('../models/userModel.js');

const getUserData = async (req, res) => {
  const userId = req.id;
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Gagal mendapatkan data user', error: err });
    } else {
      res.status(200).send({ message: 'Berhasil mendapatkan data user', data: { email: user.email, name: user.name } });
    }
  });
};

const editUserDate = async (req, res) => {
  const userId = req.params.id;
};

module.exports = { getUserData };
