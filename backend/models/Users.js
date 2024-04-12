const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String, // Add resetPasswordToken field
    resetPasswordExpires: Date // Add resetPasswordExpires field
});

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;
