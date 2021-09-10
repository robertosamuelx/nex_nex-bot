const { bot } = require('../services/api')

module.exports = {
    async get(req, res) {
        //corrigir ainda :/
        const qrcode = await bot.get('/qrcode/refresh')
        res.setHeader('Content-Type', 'image/png')
        res.setHeader('Content-Length', qrcode.headers['content-length'])
        return res.send(qrcode.data)
    }
}