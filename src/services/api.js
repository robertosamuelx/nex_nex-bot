const local = require('axios').default.create({
    proxy: {
        port: process.env.PORT,
    },
    baseURL: 'http://localhost'
})

const bot = require('axios').default.create({
    proxy: {
        port: '5000',
    },
    baseURL: 'http://localhost'
})

module.exports = {local, bot}