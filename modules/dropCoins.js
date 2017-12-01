module.exports = (client) => {
  const monitor = require('../monitors/monitor.js');
  const channel = client.channels.get(client.config.channel);
  const settings = client.settings.get(channel.guild.id);

  function giveRandomPoints(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  dropPoints = (client) => {
    if (cnnel.type !== 'text') return;
    console.log('Shit\'s happening');
    const actions = ['mine', 'drill', 'blob', 'coin'];
    const score = client.points.get(`${message.guild.id}-${message.author.id}`) || { points: 1, level: 0, user: message.author.id, guild: message.guild.id };
    const pickMethod = `${actions[Math.floor(Math.random() * actions.length)]}`;
    const response = client.awaitReply(message, `Respond with ${settings.prefix}${pickMethod} to get a random amount of Blob Coins!`);
    if ([`${pickMethod}`].includes(response.toLowerCase())) {
      console.log('Blob Coin mined!');
      response.delete();
      const points = (parseInt(settings.chatDrop));
      score.points += points;
      message.channel.send(`${message.author.username} grabbed the coins!`);
    }
    client.points.set(`${message.guild.id}-${message.author.id}`, score); */
  }

  setInterval(dropPoints, settings.chatDropRate);
}