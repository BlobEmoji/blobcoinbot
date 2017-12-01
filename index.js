const discord = require('discord.js');
const client = new discord.Client();

const config = require('./config.json');

require("./modules/db")(client);

client.on('ready', () => {
	setInterval(() => {
		require("./modules/dropCoins")(client, config)
	}, config.interval);
});

client.on("message", (msg) => {
	const prefix = `<@${client.user.id}> `

	if(msg.author.id == client.user.id) return;
	if(!msg.content.startsWith(prefix)) return;

	const args = msg.content.split(" ");
	args.shift();
	const cmd = args.shift();

	console.log(args)
	console.log(cmd)
	try {
		cmdscript = require(`./commands/${cmd}`)(client, config, msg, args);
	} catch(e) {
		console.warn(e);
		return;
	}
});

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);
