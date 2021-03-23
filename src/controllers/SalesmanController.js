const Salesman = require('../models/Salesman')

module.exports = {
    async getAllSales(req, res){
        const allSales = await Salesman.find({})
        return res.json(allSales)
    },

    async initSales(req, res){
        const { body } = req
        await Salesman.create(body)
        return res.status(201).send()
    },

    async getAllSalesman(req, res){
        const salesmans = []
        const allSalesman = await Salesman.find({})
        allSalesman.forEach( salesman => {
            const { salesmanName } = salesman
            if(!salesmans.includes(salesmanName))
                salesmans.push({"name": salesmanName})
        })
        return res.status(200).json(salesmans)
    }
}