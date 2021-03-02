const axios = require('axios').default.create({
    proxy: {
        port: process.env.PORT,
    },
    baseURL: 'http://localhost'
})

module.exports = axios