module.exports = {
name: 'leaderboard',
async execute(client, message, args) {
const sorted = client.points.array().sort((a, b) => b.points - a.points);
const top10 = sorted.splice(0, 10)
const top10Arr = []
let rank = 0
for(const data of top10) {
try {
let user = await client.getRESTUser(data.user)
rank += 1
top10Arr.push(`${rank}. **${user.username}#${user.discriminator}** - ${data.points}`);
} catch {
top10Arr.push(`${rank}. <@${data.user}> - ${data.points}`);
}}
const top = await client.getRESTUser(top10[0].user)
message.channel.createMessage({ embed: { author: { name: client.message('leaderboard') }, description: `${top10Arr.join(' \n')}`, thumbnail: { url: top.avatarURL }, color: client.config.colors.default }})
}}