module.exports = {
name: 'help',
execute(client, message, args) {
message.channel.createMessage({ embed: { author: { name: client.message('help'), icon_url: message.author.avatarURL }, thumbnail: { url: client.user.avatarURL }, description: 'help, reset, leaderboard', color: client.config.colors.default }})
}}