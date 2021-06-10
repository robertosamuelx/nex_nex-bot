const express = require('express')
const router = express.Router()
const userController = require('./controllers/UserController')
const askController = require('./controllers/AskController')
const messageController = require('./controllers/MessageController')
const homeController = require('./controllers/HomeController')
const cachedController = require('./controllers/CachedController')
const salesmanController = require('./controllers/SalesmanController')
const contactController = require('./controllers/ContactController')
const multer = require('multer')
const multerConfig = require('./config/multerConfig')
const campaignController = require('./controllers/CampaignController')

//user routes
router.get('/users', userController.list)
router.post('/user', userController.create)
router.delete('/user/:id', userController.deleteOne)
router.post('/user/login', userController.getOne)

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
router.post('/message/filtered', messageController.getFilesByUser)

//home routes
router.post('/', multer(multerConfig).single('file') ,homeController.messageReceived)
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

//contacts
router.get('/contacts', contactController.getAll)
router.get('/contacts/:id', contactController.getOne)

//control
router.get('/start', homeController.startBot)

//campaigns
router.get('/campaigns', campaignController.list)
router.post('/campaign', campaignController.create)

module.exports = router