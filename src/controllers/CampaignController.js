const Campaign = require('../models/Campaign')

module.exports = {
    async list(req, res){
        const allCampaigns = await Campaign.find({})
        return res.status(200).json(allCampaigns)
    },

    async create(req, res) {
        const { body } = req
        const campaign = await Campaign.create(body)
        return res.status(201).json(campaign)
    },
    
    async update(req, res) {
        const { body } = req
        const { id } = req.params
        const campaign = await Campaign.findByIdAndUpdate(id, body)
        return res.json(campaign)
    },

    async delete(req, res){
        const { id } = req.params
        await Campaign.findByIdAndDelete(id)
        return res.status(200).send()
    },

    async getOne(req, res){
        const { id } = req.params
        const campaign = await Campaign.findById(id)
        return res.status(200).json(campaign)
    },

    async deleteAll(req, res){
        await Campaign.deleteMany({})
        return res.status(200).send()
    },
}