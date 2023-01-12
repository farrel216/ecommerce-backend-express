const mongoose = require("mongoose");

const User = mongoose.model("User", {
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    refresh_token: {
        type: String,
    }
});

module.exports = User;