const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { DateTime } = require('luxon')

module.exports = {
    async list(req, res) {
        const users = await prisma.user.findMany()
        return res.json(users)
    },

    async create(req, res) {
        const now = DateTime.now().setZone('America/Sao_Paulo').toJSDate()
        const { body } = req
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                createdAt: now,
                lastLogin: now,
                name: body.name
            }
        })
        return res.json(user)
    },

    async getOne(req, res) {
        const { body } = req
        //falta incluir 'last login'
        const now = DateTime.now().setZone('America/Sao_Paulo').toJSDate()
        const user = await prisma.user.findFirst({
            where: {username: body.username, AND: {password: body.password}}
        })
        if(user){
            return res.status(200).json(user)
        }
        else
            return res.status(403).json({'status': 'FAIL', 'message': 'Acesso negado'})
    },

    async deleteOne(req, res) {
        const { params } = req
        const user = await prisma.user.findFirst({
            where: {
                username: params.username
            }
        })
        if(user){
            await prisma.user.delete({
                where: {
                    id: user.id
                }
            })
            return res.send()
        }
        else {
            return res.status(404).json({'status': 'FAIL', 'message': 'Usuário não encontrado'})
        }
    }
}