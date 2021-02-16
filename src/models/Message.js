const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    from: String,
    body: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Message", MessageSchema)