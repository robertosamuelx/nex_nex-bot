const { DateTime } = require('luxon')

module.exports = {
    isClosed() {
        const now = DateTime.now().setZone('America/Sao_Paulo')
        const hours = now.hour
        const minutes = now.minute
        const openHours = Number(process.env.OPENAT.split(":")[0])
        const openMinutes = Number(process.env.OPENAT.split(":")[1])
        const closeHours = Number(process.env.CLOSEAT.split(":")[0])
        const closeMinutes = Number(process.env.CLOSEAT.split(":")[1])

        if (hours < openHours || (hours == openHours && minutes < openMinutes))
            return true
        else if (hours > closeHours || (hours == closeHours && minutes > closeMinutes))
            return true
        else
            return false
    }
}