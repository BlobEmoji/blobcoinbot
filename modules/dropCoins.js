module.exports = (client) => {
  const channel = client.channels.get(client.config.channel)
  const str = client.config.words[Math.floor(Math.random() * client.config.words.length)]

  channel.send(`:exclamation: Type \`${str}\` to collect a blob coin!`)

  const collect = channel.createMessageCollector(m => {
    return m.content === str && m.author.id !== client.user.id
  }, {time: client.config.timeout})

  collect.on('collect', (msg) => {
    collect.stop()
    client.dataPull().then((data) => {
      let coins = data[msg.author.id] || 0
      coins++
      data[msg.author.id] = coins
      client.dataPush(data).then(() => {
        msg.reply(`:ok_hand: You have collected a blob coin! You now have ${coins} blob coins!`)
      }).catch((e) => {
        msg.reply(':x: Oops! There was an error attempting to write to the database.')
        console.warn(e)
      })
    }).catch((e) => {
      msg.reply(':x: Oops! There was an error attempting to read the database.')
      console.warn(e)
    })
  })

  collect.on('end', (c, r) => {
    if (r === 'time') channel.send(':hourglass: Sorry! No one responded in time')
  })
}
