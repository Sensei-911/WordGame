module.exports = {
name: 'reset',
execute(client, message, args) {
if (!message.member.permission.has('manageGuild')) return message.channel.createMessage({ embed: { title: client.message('wordError'), description: client.message('permissionError'), color: client.config.colors.red }})
let alphabet = client.message('alphabet')
var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
client.db.set("letters", [letter])
client.db.set("lastUser", undefined)
message.channel.createMessage({ embed: { title: client.message('success'), description: client.message('reset', letter), color: client.config.colors.green }})
}}