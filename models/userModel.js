const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
  },
  nohp: {
    type: String,
  },
  role: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
