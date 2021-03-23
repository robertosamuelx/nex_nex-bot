const cache = require('../services/cache')
const { local, bot } = require('../services/api')
const Message = require('../models/Message')
const salesmanController = require('./SalesmanController')

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
            cache.new(user)
            const { data } = await local.get('/ask')
            response = 'Olá,\n\nSerá um prazer te atender. Para agilizar seu atendimento digite:\n\n'
            data.forEach( el => {
                response = response + el.ask + '\n'
            })
        }

        else {
            const cachedUser = cache.get(user)

            if(cachedUser.shouldRespond){
                
                if(cachedUser.wantsOrder){

                    if(message == 'sim'){
                        response = 'Ótimo, vou chamar um de nossos atendentes para falar com você!\nAguarde um momento...'
                        cache.profile.shouldRespond = false
                        cache.new(user)
                    }
                    else {
                        response = 'Sem problemas, para voltar ao menu principal digite MENU'
                        cache.profile.wantsOrder = false
                        cache.new(user)
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
                                cache.profile.wantsOrder = true
                                cache.new(user)
                                response += "\n\nDeseja fazer um pedido?"
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
                user: groupedContact,
                messages
            }
        })
        return res.json(groupedContacts)
    },

    async messageSended(req, res){
        const { body } = req
        console.log(body)
        await local.post('/message', body)
        await bot.post('/response', {
            to: body.to,
            message: body.body
        })
        cache.delete(body.to)
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
    }
}