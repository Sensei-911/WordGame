module.exports = (client, message, args) => {

const Eris = require("eris");
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const cooldowns = new Eris.Collection();
const config = require('../../config.json');

client.on("messageCreate", async (message) => {
if(message.author.bot || message.channel.type == 1) return;
if(message.content == `<@!${client.user.id}>`) message.channel.createMessage(`**${client.message('prefix')} \`${config.prefix}\`**`)

const prefixRegex = new RegExp(`${escapeRegex(config.prefix)}`)

if(!prefixRegex.test(message.content.toLowerCase())) return;
const [matchedPrefix] = message.content.toLowerCase().match(prefixRegex);

var args = message.content.slice(matchedPrefix.length).trim().split(/ +/)

const commandName = args.shift().toLowerCase();
const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
if (!command) return;

if (!cooldowns.has(command.name)) {

cooldowns.set(command.name, new Eris.Collection())}
const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 1) * 1000;
if (timestamps.has(message.author.id)) {
const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
if (now < expirationTime) {
const timeLeft = (expirationTime - now) / 1000;
const msg = await message.channel.createMessage(client.message('cooldown'), timeLeft.toFixed(1))
return setTimeout(() => client.deleteMessage(message.channel.id, msg.id), timeLeft * 1000);

}}

timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

if(command.ownerOnly && message.author.id != config.author) return
if(command.recovery) return message.channel.createMessage(client.message('recovery'))

try {
command.execute(client, message, args)
}
catch (error) {
client.logger.error('Message Handler', error)
message.channel.createMessage(client.message('error'))
}

})}