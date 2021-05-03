const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    body: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isFile: {
        type: Boolean,
        default: false
    },
    fileURL: String,
    fileKey: String
})

module.exports = mongoose.model("Message", MessageSchema)