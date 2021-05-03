require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const router = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log('MongoDB is connected!')
})

app.use(morgan('common'))
app.use(helmet())
app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {
    console.log('Server is running!')
})