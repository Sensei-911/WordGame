module.exports = (client) => {
client.on('ready', async () => {
const Logo = require('asciiart-logo');
client.editStatus('online', { name: `${client.config.prefix} help`, type: 0 }) 
console.log(Logo({ name: client.message('logoName'), font: 'Big', lineChars: 15, padding: 5, margin: 2 }).emptyLine().right(`v2.3.5`).emptyLine().render())
client.logger.info('Event Handler', client.message('ready'))
})

}