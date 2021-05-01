module.exports = (client, message, args) => {
client.on("messageCreate", async (message) => {
const commandName = message.content.slice(client.config.prefix.length).trim().split(/ +/).shift().toLowerCase();
const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
if (message.author.bot || message.channel.type == 1 || message.content.startsWith('.') || message.content.startsWith(`${client.config.prefix}pr`) || message.channel.id != client.config.gameChannelID || command) return

const letters = client.db.get('letters')
const alphabet = client.message('alphabet')
const gameLanguage = client.db.get('language')
client.points.ensure(`${message.author.id}`, { user: message.author.id, points: 0 });

// ----------------------------------------------------------------

if (letters == undefined) {
var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
client.db.set('letters', [letter])
}

if (gameLanguage == undefined) {
client.db.set('language', client.config.language)
}

if (gameLanguage != client.config.language) {
var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
client.db.set('letters', [letter])
client.db.set('language', client.config.language)
client.db.set("lastUser", undefined)
let err = await message.channel.createMessage({ embed: { title: client.message('wordError'), description: client.message('changedLanguage'), color: client.config.colors.red }})
client.deleteMessage(message.channel.id, message.id).catch(() => {})
setTimeout(() => client.deleteMessage(message.channel.id, err.id).catch(() => {}), 3000)
return
}

// ----------------------------------------------------------------

if (client.db.get('lastUser') == message.author.id) {
let err = await message.channel.createMessage({ embed: { title: client.message('wordError'), description: client.message('wordError1'), color: client.config.colors.red }})
client.deleteMessage(message.channel.id, message.id).catch(() => {})
setTimeout(() => client.deleteMessage(message.channel.id, err.id).catch(() => {}), 3000)
return
}

// ----------------------------------------------------------------

if (!letters[letters.length - 1].toLowerCase().endsWith(message.content.charAt(0).toLowerCase())) {
let err = await message.channel.createMessage({ embed: { title: client.message('wordError'), description: client.message('wordError2', letters[letters.length - 1].charAt(letters[letters.length - 1].length - 1)), color: client.config.colors.red }})
client.deleteMessage(message.channel.id, message.id).catch(() => {})
setTimeout(() => client.deleteMessage(message.channel.id, err.id).catch(() => {}), 3000)
return
}

// ----------------------------------------------------------------

const fetch = require('node-fetch');
var kelime = true
if (client.config.language == 'en') {
let api = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${encodeURI(message.content)}`).then(json => json.statusText)
if (api == "Not Found") {
kelime = false
}}

if (client.config.language == 'tr') {
let api = await fetch(`https://sozluk.gov.tr/gts?ara=${encodeURI(message.content)}`).then(json => json.json())
if (api.error) {
kelime = false
}}

if (kelime == false) {
let err = await message.channel.createMessage({ embed: { title: client.message('wordError'), description: client.message('wordError3'), color: client.config.colors.red }})

client.deleteMessage(message.channel.id, message.id).catch(() => {})
setTimeout(() => client.deleteMessage(message.channel.id, err.id).catch(() => {}), 3000)
}

if (kelime == true) {

// ----------------------------------------------------------------

if (letters.includes(message.content.toLowerCase())) {
let err = await message.channel.createMessage({ embed: { title: client.message('wordError'), description: client.message('wordError4'), color: client.config.colors.red }})
client.deleteMessage(message.channel.id, message.id).catch(() => {}).catch(() => {})
setTimeout(() => client.deleteMessage(message.channel.id, err.id).catch(() => {}), 3000)
return
}

// ----------------------------------------------------------------

if (gameLanguage == 'tr' ? message.content.charAt(message.content.length - 1).toLowerCase() == 'ğ': message.content.charAt(message.content.length - 1).toLowerCase() == 'w') {
if (letters.length < 100) {
let err = await message.channel.createMessage({ embed: { title: client.message('wordError'), description: client.message('wordError5', 100 - letters.length), color: client.config.colors.default }})
client.deleteMessage(message.channel.id, message.id).catch(() => {})
setTimeout(() => client.deleteMessage(message.channel.id, err.id).catch(() => {}), 3000)
return
}
var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
client.db.set("letters", [letter])
message.channel.createMessage({ embed: { title: client.message('gameOver'), description: `${message.author.username}, ${client.message('wordError6', letter)}`, color: client.config.colors.green }})
points.inc(message.author.id, "points");
}

// ----------------------------------------------------------------

message.addReaction('✔')
client.db.push('letters', message.content.toLowerCase());
client.db.set('lastUser', message.author.id);
client.points.inc(message.author.id, "points");
}

})}