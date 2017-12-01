const discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new discord.Client()

if (!fs.existsSync('./data.json')) fs.writeFile('data.json', "{}", 'utf8');

dataPush = (obj) => new Promise((resolve, reject) => {
	json = JSON.stringify(obj)
	fs.writeFile('data.json', json, (err) => {
		if (err) reject(err);
		else resolve(json)
	});
})

dataPull = () => new Promise((resolve, reject) => {
	fs.readFile('data.json', (err, data) => {
		if (err) reject(err);
		else {
			try {
				obj = JSON.parse(data)
			} catch (e) {
				reject(e)
			}
			resolve(obj)
		}
	});
})

dropCoins = () => {
	const channel = client.channels.get(config.channel)

	const str = config.words[Math.floor(Math.random()*config.words.length)];

	channel.send(`:exclamation: Type \`${str}\` to collect a blob coin!`)

	collect = channel.createMessageCollector(m => {
		return m.content.includes(str) && m.author.id != client.user.id
	}, {time: config.timeout})

	collect.on('collect', (msg) => {
		collect.stop()
		dataPull().then((data) => {
			coins = data[msg.author.id] || 0;
			coins++
			data[msg.author.id] = coins
			dataPush(data).then(() => {
				msg.reply(`:ok_hand: You have collected a blob coin! You now have ${coins} blob coins!`)
			}).catch((e) => {
				msg.reply(":x: Oops! There was an error attempting to write to the database.")
				console.warn(e)
			})
		}).catch((e) => {
			msg.reply(":x: Oops! There was an error attempting to read the database.")
			console.warn(e)
		})
		
	});

	collect.on('end', (c, r) => {
		if (r == "time") channel.send(":hourglass: Sorry! No one responded in time.")
	});
}

setInterval(dropCoins, config.interval)

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);