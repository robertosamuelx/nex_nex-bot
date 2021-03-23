const express = require('express')
const router = express.Router()
const userController = require('./controllers/UserController')
const askController = require('./controllers/AskController')
const messageController = require('./controllers/MessageController')
const homeController = require('./controllers/HomeController')
const cachedController = require('./controllers/CachedController')
const salesmanController = require('./controllers/SalesmanController')

//user routes
router.get('/user', userController.list)

//ask routes
router.get('/ask', askController.list)
router.post('/ask', askController.insert)
router.put('/ask/:id', askController.update)
router.delete('/ask/:id', askController.delete)
router.get('/ask/:id', askController.getOne)

//message routes
router.get('/message', messageController.list)
router.put('/message/:id', messageController.update)
router.post('/message', messageController.create)
router.delete('/message/:id', messageController.delete)
router.get('/message/:id', messageController.getOne)
router.get('/deleteall', messageController.deleteAll)

//home routes
router.post('/', homeController.messageReceived)
router.post('/chats', homeController.getChats)
router.post('/send', homeController.messageSended)

//cached routes
router.get('/cached/:id', cachedController.get)
router.get('/cached', cachedController.getAll)

//salesman routes
router.get('/sales', salesmanController.getAllSales)
router.post('/salesman', salesmanController.initSales)
router.get('/salesman', salesmanController.getAllSalesman)
router.get('/categories', homeController.getCategories)

module.exports = router