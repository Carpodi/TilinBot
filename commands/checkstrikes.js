const Discord = require('discord.js')
const { Permissions } = require('discord.js');

db = require("megadb")
strike = new db.crearDB("strike");
module.exports = {
    name: 'check',
  async execute(client, message, args) { 

   let user = message.mentions.members.first()
   const noob = strike.has(user.id) 
   //false embed
   const fembed = new Discord.MessageEmbed()
   .setTitle("Lista de blacklist!")
   .setTitle(`El usuario ${user.user.username} no tiene strikes`)
           //true embed
           const tembed = new Discord.MessageEmbed()
           .setTitle("Lista de blacklist!")
           .setDescription(`El usuario ${user.user.username} esta en los strikes`)
   if (!noob) return message.channel.send({embeds: [fembed]})
   else { 
       message.channel.send({embeds: [tembed]})
   }
}}
  