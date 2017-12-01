const discord = require('discord.js');
const client = new discord.Client();

const config = require('./config.json');

require("./modules/db")(client);


client.on('ready', () => {
	setInterval(() => {
		require("./modules/dropCoins")(client, config)
	}, config.interval);
});

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);