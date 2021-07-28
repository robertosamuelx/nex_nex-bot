const { bot } = require('../services/api')

module.exports = {

    async getAll(req, res){
        const { data } = await bot.get('/contacts', {headers: {"filter": req.headers['filter'] ? req.headers['filter'] : ""}})
        return res.json(data)
    },

    async getOne(req, res){
        const { data } = await bot.get('/contacts/'+req.params.id)
        return res.json(data)
    }
}