const Ask = require('../models/Ask')

module.exports = {
    async list(req, res) {
        const asks = await Ask.find({})
        return res.status(200).json(asks)
    },

    async insert(req, res) {
        const { body } = req
        const json = await Ask.create(body)
        return res.status(201).json({...json._doc, "response": "OK"})
    },

    async update(req, res) {
        const { id } = req.params
        const { body } = req
        const ask = await Ask.findOneAndUpdate({id}, body)
        return res.status(200).json({...ask._doc, body})
    },

    async delete(req, res) {
        const { id } = req.params
        const ask = await Ask.findOne({id}).exec()
        if(ask !== null){
            await ask.deleteOne()
            return res.status(200).send()
        }
        else {
            return res.status(404).json({"response": "ERROR", "message": "Pergunta não encontrada"})
        }
    },

    async getOne(req, res){
        const { id } = req.params
        const ask = await Ask.findOne({id}).exec()
        return res.status(200).json(ask)
    }
}