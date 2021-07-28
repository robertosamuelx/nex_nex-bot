const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    name: String
})

module.exports = mongoose.model("User",UserSchema)