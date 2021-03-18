const Salesman = require('../models/Salesman')

module.exports = {
    async getAll(req, res){
        const allSalesman = await Salesman.find({})
        return res.json(allSalesman)
    },

    async initSales(req, res){
        const { body } = req
        await Salesman.create(body)
        return res.status(201).send()
    }
}