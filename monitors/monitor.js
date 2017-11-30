const timeout = new Map();
function giveRandomPoints(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = class {

  static run(client, message, level) {
    this.givePoints(client, message, level);
  }
  
  async run(client, message, level) {
    this.dropPoints(client, message, level);
  }

  static givePoints(client, message, level) {
    if (message.channel.type !== 'text') return;
    const settings = client.settings.get(message.guild.id);
    if (message.content.startsWith(settings.prefix)) return;
    const score = client.points.get(`${message.guild.id}-${message.author.id}`) || { points: 200, level: 1, user: message.author.id, guild: message.guild.id };
    const timedOut = timeout.get(`${message.guild.id}-${message.author.id}`);
    if (timedOut) return;
    timeout.set(`${message.guild.id}-${message.author.id}`, true);
    const points = giveRandomPoints(parseInt(settings.minPoints), parseInt(settings.maxPoints));
    setTimeout(() => {
      timeout.set(`${message.guild.id}-${message.author.id}`, false);
      score.points += points;
      console.log(`Awarded ${points} points to ${message.author.username}`);
    }, parseInt(settings.scoreTime) * 60 * 1000);

    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    if (score.level < curLevel) {
      if (settings.levelNotice === 'true')
        message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      score.level = curLevel;
    }
    client.points.set(`${message.guild.id}-${message.author.id}`, score);
  }


  async dropPoints(client, message, level) {
    if (message.channel.type !== 'text') return;
    console.log('Shit\'s happening');
    const actions = ['mine', 'drill', 'blob', 'coin'];
    const score = client.points.get(`${message.guild.id}-${message.author.id}`) || { points: 1, level: 0, user: message.author.id, guild: message.guild.id };
    const settings = client.settings.get(message.guild.id);
    const pickMethod = `${actions[Math.floor(Math.random() * actions.length)]}`;
    const response = await this.client.awaitReply(message, `Respond with ${settings.prefix}${pickMethod} to get a random amount of Blob Coins!`);
    if ([`${pickMethod}`].includes(response.toLowerCase())) {
      console.log('Blob Coin mined!');
      await response.delete();
      const points = (parseInt(settings.chatDrop));
      score.points += points;
      message.channel.send(`${message.author.username} grabbed the coins!`);
    }
    setInterval(dropPoints, settings.chatDropRate);
  }

};
