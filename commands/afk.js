const Discord = require('discord.js');
db = require("megadb")
afk = new db.crearDB("afk");
module.exports = {
  name: 'afk',

  execute(client, message, args) {
    let user =  message.author;
    let msg = args.join(' '); 
    afk.establecer(`${user.id}`, msg)
    if (!msg) return message.channel.send({content: `AFK: AFK`})
    message.channel.send({content:`AFK: ${msg}`})}}
