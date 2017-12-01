const discord = require('discord.js');
const config = require('./config.json');

client.on('ready', () => {
	console.log("Ready event here.");
});

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);