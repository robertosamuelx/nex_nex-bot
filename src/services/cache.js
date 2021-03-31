const NodeCache = require('node-cache')
const myCache = new NodeCache({stdTTL: process.env.TTL})

module.exports = {

    isCached(user){
        return myCache.has(user)
    },

    get(user){
        return myCache.get(user)
    },

    keys(){
        return myCache.keys()
    },

    getAll(){
        return this.keys().map( key => {
            return {
                user: key,
                ...myCache.get(key),
            }
        })
    },

    new(user){
        myCache.set(user, {
            wantsOrder: false,
            shouldRespond: true,
            salesman: ''
        })
    },

    delete(user){
        myCache.del(user)
    }
}