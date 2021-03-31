const cache = require('../services/cache')
const { local, bot } = require('../services/api')
const Message = require('../models/Message')
const salesmanController = require('./SalesmanController')
const { DateTime } = require('luxon')

module.exports = {
    async messageReceived(req, res) {
        console.log('messageReceived')
        const { body:message } = req.body
        const { user } = req.body
        let response = ''
        await local.post('/message', {
            from: user,
            to: req.body.to,
            createdAt: req.body.date,
            body: message
        })

        if(!cache.isCached(user)){
            cache.new(user, cache.profile())
            const { data } = await local.get('/ask')
            response = 'Olá, eu sou Juca, o Assistente Virtual das Lojas Juarez\n\nSerá um prazer te atender. Para agilizar seu atendimento digite:\n\n'
            data.forEach( el => {
                response = response + el.ask + '\n'
            })
        }

        else {
            const cachedUser = cache.get(user)
            console.log(cachedUser)

            if(cachedUser.shouldRespond){
                
                if(cachedUser.wantsOrder){

                    if(message == 'sim'){

                        const now = DateTime.now().setZone('America/Sao_Paulo')
                        const hour = now.hour
                        const minutes = now.minute
                        console.log(hour + ' ' + minutes)
                        if(((hour >= 10) || (hour == 9 && minutes >= 30)) && hour < 17){
                            response = 'Certo, vou encaminhar para um especialista te atender.\nVocê está na fila de atendimento, em breve será atendido'
                            cachedUser.shouldRespond = false
                            cache.new(user, cachedUser)
                        }
                        else {
                            response = 'Nosso horário de atendimento online é das 09h30 às 17h00 \nAssim que possível um dos nossos vendedores irá te atender\n\nObrigado pela preferência\n\nPara voltar ao menu principal digite MENU'
                            cachedUser.wantsOrder = false
                            cache.new(user, cachedUser)
                        }
                    }
                    else {
                        response = 'Certo, se precisar de algo mais estarei à disposição.\nPara ser atendido novamente digite: Menu\n\nConfira nossas promoções no nosso instagrm @foto_juarez'
                        cachedUser.wantsOrder = false
                        cache.new(user, cachedUser)
                    }
                }

                else {

                    if(message == 'menu'){
                        const { data } = await local.get('/ask')
                        data.forEach( el => {
                            response = response + el.ask + '\n'
                        })
                    }

                    else {
                        const { data } = await local.get('/ask/' + message)
                        if(message == 'bye')
                            cache.delete(user)

                        if(data == null)
                            response = "Ops, não encontrei essa opção, por favor tente novamente."
                        else {
                            response = data.answer

                            console.log(data.isOrder)

                            if(data.isOrder){
                                cachedUser.wantsOrder = true
                                cache.new(user, cachedUser)
                                response += "\n\nDeseja fazer um pedido?\nDigite: *sim* ou *não*"
                            }

                            else
                                response += "\n\nAgradecemos pelo contato, para voltar ao menu principal digite MENU\nNão se esqueça de seguir nosso instagram para receber nossas novidades @foto_juarez"
                        }
                    }
                }
            }
        }

        if(response !== ''){
            await local.post('/message', {
                to: user,
                from: req.body.to,
                createdAt: new Date(),
                body: response
            })
        }

        return res.json({response})
    },

    async getChats(req, res){
        const { filter } = req.body
        const contacts = await Message.find({}).sort({createdAt: 'asc'})
        let groupedContacts = []
        contacts.map(contact => {
            const from = contact.from
            if(!groupedContacts.includes(from) && from !== process.env.MY_NUMBER)
                groupedContacts.push(from)
        })

        groupedContacts = groupedContacts.map( (groupedContact, index) => {
            const messages = contacts.map(contact => {
                if(contact.from === groupedContact)
                    return {
                        date: contact.createdAt,
                        value: contact.body
                    }
                else if(contact.to === groupedContact && contact.from === process.env.MY_NUMBER){
                    return {
                        date: contact.createdAt,
                        value: contact.body,
                        isFromMe: true,
                    }
                }
            }).filter(i => i !== null ? i : null)
            return {
                id: index,
                salesman: cache.get(groupedContact).salesman,
                user: groupedContact,
                messages
            }
        })
        return res.json(groupedContacts)
    },

    async messageSended(req, res){
        const { body } = req
        await local.post('/message', body)
        await bot.post('/response', {
            to: body.to,
            message: body.body
        })
        const cachedUser = cache.get(body.to)
        cachedUser.salesman = body.salesman ? body.salesman : ''
        cache.new(body.to, cachedUser)
        return res.send()
    },

    async getCategories(req, res){
        const response = []
        response.push({"value": "Não lidos", "options": []})
        const {data: salesmans} = await local.get('/salesman')
        response.push({"value": "Por vendedor", "options":salesmans.map( el => el.name)})
        const { data: asks } = await local.get('/ask')
        response.push({"value": "Por pergunta", "options": asks.map(el => el.ask)})
        return res.json(response)
    },

    async startBot(req, res){
        await bot.get('/start')
        return res.status(200).send()
    }
}