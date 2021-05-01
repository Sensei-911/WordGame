const Eris = require('eris')
const config = require('../config.json')
const Enmap = require("enmap");
const client = new Eris.Client(config.token, { debug: true, restMode: true, allowedMentions: { everyone: false, roles: false, users: true }, autoreconnect: true, defaultImageSize: 1024, disableEveryone: true, messageLimit: 0, disableEvents:{ TYPING_START:true, VOICE_SERVER_UPDATE:true, VOICE_STATE_UPDATE:true, USER_NOTE_UPDATE:true, CHANNEL_PINS_UPDATE:true, MESSAGE_UPDATE:true, RELATIONSHIP_ADD:true, RELATIONSHIP_REMOVE:true } })

client.commands = new Eris.Collection();
client.db = new Enmap({ name: "settings", autoFetch: true, fetchAll: false });
client.points = new Enmap("puanlar");
client.logger = require('./utils/Logger.js'), (client)
client.config = config, (client) 
client.message = require('./utils/Language.js'), (client)

if (client.config.language != 'en' && client.config.language != 'tr') return client.logger.error('config.json', 'Language must be "en" or "tr"')
if (!client.config.gameChannelID) return client.logger.error('config.json', 'gameChannelID must be filled.')

const { readdirSync } = require("fs");
const handlers = [];

readdirSync('./src/handlers').forEach(dir => handlers.push(dir))
handlers.forEach(handler => require(`./handlers/${handler}`)(client))

readdirSync('./src/commands').forEach(dir => {
const commandFiles = readdirSync(`./src/commands/`).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
const command = require(`./commands/${dir}`);
client.commands.set(command.name, command)
}})

process.on('unhandledRejection', rejection => {
client.logger.error('unhandledRejection', rejection);
});

client.connect();