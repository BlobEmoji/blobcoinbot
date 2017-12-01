const { Client } = require('discord.js')
const client = new Client()

const config = require('./config.json')

require('./modules/db')(client)

client.config = config

client.on('ready', () => {
  setInterval(() => {
    require('./modules/dropCoins')(client)
  }, config.interval)
})

client.on('message', (msg) => {
  const prefix = `<@${client.user.id}> `

  if (msg.author.id === client.user.id) return
  if (!msg.content.startsWith(prefix)) return

  const [, cmd, ...args] = msg.content.split(' ')

  try {
    require(`./commands/${cmd}`)(client, msg, args)
  } catch (e) {
    console.warn(e)
  }
})

client.on('debug', console.log)
client.on('error', console.error)
client.on('warn', console.warn)
client.on('disconnect', console.warn)

client.login(config.token)
