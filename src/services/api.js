const local = require('axios').default.create({
    proxy: {
        port: process.env.PORT,
    },
    baseURL: process.env.ENDPOINT_MANAGER
})

const bot = require('axios').default.create({
    baseURL: process.env.ENDPOINT_COLLECTOR
})

module.exports = {local, bot}