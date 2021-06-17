const mongoose = require('mongoose')

const CampaignSchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    contacts: [],
    message: String,
    sendAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Campaign", CampaignSchema)