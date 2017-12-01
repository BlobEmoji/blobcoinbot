const discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new discord.Client()

if (!fs.existsSync('./data.json')) fs.writeFile('data.json', {}, 'utf8');

dropCoins = () => {
	const channel = client.channels.get(config.channel)

	const str = "blobs"

	channel.send(`:exclamation: Type \`${str}\` to collect a blob coin!`)

	collect = channel.createMessageCollector(m => {
		return m.content.includes(str) && m.author.id != client.user.id
	}, {time: config.timeout})

	collect.on('collect', (msg) => {
		msg.reply(":ok_hand: You've collected a blob coin!")
		collect.stop()
	});

	collect.on('end', (c, r) => {
		if (r == "time") channel.send(":hourglass: Sorry! No one responded in time.")
	});
}

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);

setInterval(dropCoins, config.interval)