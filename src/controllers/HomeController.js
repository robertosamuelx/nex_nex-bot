const cache = require('../services/cache')
const api = require('../services/api')


module.exports = {
    async messageReceived(req, res) {
        const { body:message } = req.body
        const { user } = req.body
        let response = ''

        if(!cache.isCached(user)){
            cache.new(user)
            const { data } = await api.get('/ask')
            data.forEach( el => {
                response = response + el.ask + '\n'
            })
        }

        else {
            const cachedUser = cache.get(user)

            if(cachedUser.shouldRespond){
                
                if(cachedUser.wantsOrder){

                    if(message == 'sim')
                        response = 'Ótimo, vou chamar um de nossos atendentes para falar com você!\nAguarde um momento...'
                    else
                        response = 'Sem problemas, para voltar ao menu principal digite MENU'
                }

                else {

                    if(message == 'menu'){
                        const { data } = await api.get('/ask')
                        data.forEach( el => {
                            response = response + el.ask + '\n'
                        })
                    }

                    else {
                        const { data } = await api.get('/ask/' + message)
                        if(message == 'bye')
                            cache.delete(user)

                        if(data == null)
                            response = "Ops, não encontrei essa opção, por favor tente novamente."
                        else
                            response = data.answer
                    }
                }
            }
            else
                response = 'Já avisei ao atendente que você quer falar com ele...'
        }

        return res.json({response})
    }
}