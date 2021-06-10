const mongoose = require('mongoose')

const CampaignSchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    contacts: []
})

module.exports = mongoose.model("Campaign", CampaignSchema)