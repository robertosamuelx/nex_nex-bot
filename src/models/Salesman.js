const mongoose = require('mongoose')

const SalesmanSchema = new mongoose.Schema({
    chatId: Number,
    salesmanName: String
})

module.exports = mongoose.model("Salesman", SalesmanSchema)