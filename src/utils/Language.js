module.exports = (msg, optional) => {
const languages = require('../../languages.json')
const config = require('../../config')
const language = config.language ? config.language: 'en'
let executedMessage = languages[language][msg]
if (executedMessage.includes('%msg%')) {
executedMessage = executedMessage.replace("%msg%", optional);
}

return executedMessage
}