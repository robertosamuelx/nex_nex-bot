const mongoose = require('mongoose')

const AskSchema = new mongoose.Schema({
    ask: String,
    answer: String,
    id: String,
    isOrder: Boolean
})

module.exports = mongoose.model("Ask", AskSchema)