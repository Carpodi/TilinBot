const { Client, Intents, Discord } = require('discord.js');
const wait = require('util').promisify(setTimeout);
global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS 
    ]
    });
  const activities = [`=help`, `discord.gg/tilines Bot.`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: "WATCHING" });
  }, 30000);
client.config = require('./config');
require('./src/loader');
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./storage/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#2F3136",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: `🛑 **Ultima oportunidad para entrar!** 🛑`,
      threshold: 5000,
      embedColor: '#FF0000'
    }
  }
});


client.login(client.config.dsc.token);