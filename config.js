const config = {
  'ownerID': '166304313004523520',
  
  'appID': '385467871570034689',

  'admins': ['203300837928206337', '108429628560924672', '155859105326563328', '123879073972748290', '140564059417346049', '122122926760656896', '136429236167770112', '152164749868662784', '231252858333429764'],

  'support': [],

  'token': 'Mzg1NDY3ODcxNTcwMDM0Njg5.DQByhw.thvtvPowdxRoFD5HaPYK88sJvXI',

  'defaultSettings' : {
    'prefix': '-',
    'modLogChannel': 'mod-log',
    'modRole': 'Blob Council',
    'adminRole': 'Blob Police',
    'systemNotice': 'true',
    'levelNotice': 'false',
    'minPoints': '1',
    'maxPoints': '50',
    'customEmoji': 'false',
    'gEmojiID': '385473147001896970',
    'uEmoji': '💲' 
  },


  permLevels: [
    { level: 0,
      name: 'User', 
      check: () => true
    },

    { level: 2,
      name: 'Moderator',
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: 'Administrator', 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { level: 4,
      name: 'Server Owner', 
      check: (message) => message.channel.type === 'text' ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
    { level: 8,
      name: 'Bot Support',
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: 'Bot Admin',
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: 'Bot Owner', 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;