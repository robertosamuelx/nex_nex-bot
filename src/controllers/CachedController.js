const cache = require('../services/cache')

module.exports = {
    getAll(req, res){
        const response = cache.getAll()
        return res.status(200).json(response)
    },

    get(req, res){
        const { id } = req.params
        const response = cache.get(id)
        return res.status(200).json(response)
    },

    delete(req, res){
        const { id } = req.params
        cache.delete(id)
        return res.send()
    }
}