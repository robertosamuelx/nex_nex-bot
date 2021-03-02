const NodeCache = require('node-cache')
const myCache = new NodeCache({stdTTL: process.env.TTL})

module.exports = {

    profile: {
        wantsOrder: false,
        shouldRespond: true
    },

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
        return this.keys().map( key => myCache.get(key))
    },

    new(user){
        myCache.set(user, this.profile)
    },

    delete(user){
        myCache.del(user)
    }
}