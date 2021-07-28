const User = require('../models/User')
const { DateTime } = require('luxon')

module.exports = {
    async list(req, res) {
        const users = await User.find({})
        return res.json(users)
    },

    async create(req, res) {
        const now = DateTime.now().setZone('America/Sao_Paulo').toJSDate()
        const { body } = req
        const user = await User.create({
            username: body.username,
            password: body.password,
            createdAt: now,
            lastLogin: now,
            name: body.name
        })
        return res.json(user)
    },

    async getOne(req, res) {
        const { body } = req
        //falta incluir 'last login'
        const now = DateTime.now().setZone('America/Sao_Paulo').toJSDate()
        const user = await User.find({ username: body.username, password: body.password })
        if (user.length > 0) {
            return res.status(200).json(user[0])
        }
        else
            return res.status(403).json({ 'status': 'FAIL', 'message': 'Acesso negado' })
    },

    async deleteOne(req, res) {
        const { params } = req
        await User.findByIdAndDelete(params.id)
        return res.send()
    }
}