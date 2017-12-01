module.exports = (client, config, msg, args) => {
	if(!(msg.author.id == config.owner)) {
		msg.reply(":x: Access denied.");
		return;
	}

	try {
		const code = args.join(' ');
		result = eval(code);

		if (typeof result !== 'string') {
        	result = require('util').inspect(result);
		}

		msg.reply(clean(result), {code:'xl', split: true})
	} catch(e) {
		msg.reply(`:interrobang: Error.\`\`\`xl\n${clean(e)}\`\`\``, {split: true});
	}
}

function clean(text) {
	if (typeof(text) === 'string') {
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	} else {
		return text;
	}
}