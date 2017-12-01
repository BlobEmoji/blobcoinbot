/* eslint no-eval: 0 */

module.exports = (client, msg, args) => {
  if (msg.author.id !== client.config.owner) return msg.reply(':x: Access denied.')

  try {
    const code = args.join(' ')
    let result = eval(code)

    if (typeof result !== 'string') result = require('util').inspect(result)

    msg.reply(clean(result), {code: 'xl', split: true})
  } catch (e) {
    msg.reply(`:interrobang: Error.\`\`\`xl\n${clean(e)}\`\`\``, {split: true})
  }
}

function clean (text) {
  if (typeof (text) === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
  else return text
}
