const Message = require('../models/Message')
const LIMIT = 50
const aws = require('aws-sdk')
const s3 = new aws.S3()
const s3Zip = require('s3-zip')

module.exports = {

    async list(req, res){
        const allMessages = await Message.find({}).sort({createdAt: 'asc'})
        return res.status(200).json(allMessages)
    },

    async create(req, res) {
        const { body } = req
        const message = await Message.create(body)
        return res.status(201).json(message)
    },

    async update(req, res) {
        const { body } = req
        const { id } = req.params
        const message = await Message.findByIdAndUpdate(id, body)
        return res.json({...message._doc, body})
    },

    async delete(req, res){
        const { id } = req.params
        await Message.findByIdAndDelete(id)
        return res.status(200).send()
    },

    async getOne(req, res){
        const { id } = req.params
        const message = await Message.findById(id)
        return res.status(200).json(message)
    },

    async deleteAll(req, res){
        await Message.deleteMany({})
        return res.status(200).send()
    },

    async getFilesByUser(req, res) {
        console.log(req.body)
        const { filter, user } = req.body
        const messages = await Message.find({from: user, isFile: true}).limit(filter.quantity ? filter.quantity : LIMIT)
        const keys = messages.map(message => message.fileKey)
        s3Zip
            .archive({s3: s3, bucket: process.env.AWS_BUCKET_NAME},'', keys)
            .pipe(res) 
    }
}