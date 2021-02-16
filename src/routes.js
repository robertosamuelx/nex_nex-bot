const express = require('express')
const router = express.Router()
const userController = require('./controllers/UserController')
const askController = require('./controllers/AskController')
const messageController = require('./controllers/MessageController')

router.get('/user', userController.list)

router.get('/ask', askController.list)
router.post('/ask', askController.insert)
router.put('/ask/:id', askController.update)
router.delete('/ask/:id', askController.delete)

router.get('/message', messageController.list)
router.put('/message/:id', messageController.update)
router.post('/message', messageController.create)
router.delete('/message/:id', messageController.delete)

module.exports = router