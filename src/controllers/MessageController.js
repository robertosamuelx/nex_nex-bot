const Message = require('../models/Message')

module.exports = {

    async list(req, res){
        const allMessages = await Message.find({}).sort({createdAt: 'asc'})
        return res.status(200).json(allMessages)
    },

    async create(req, res) {
        const { body } = req
        const message = await Message.create(body)
        return res.status(201).json(message)
    },

    async update(req, res) {
        const { body } = req
        const { id } = req.params
        const message = await Message.findByIdAndUpdate(id, body)
        return res.json({...message._doc, body})
    },

    async delete(req, res){
        const { id } = req.params
        await Message.findByIdAndDelete(id)
        return res.status(200).send()
    },

    async getOne(req, res){
        const { id } = req.params
        const message = await Message.findById(id)
        return res.status(200).json(message)
    },

    async deleteAll(req, res){
        await Message.deleteMany({})
        return res.status(200).send()
    }
}