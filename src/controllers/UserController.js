const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    async list(req, res) {
        const users = await prisma.user.findMany()
        return res.json(users)
    },

    getOne(req, res) {
        
    },
    
    delete(req, res) {
        
    },

    update(req, res) {
        
    },

    insert(req, res) {
        
    }
}