const Discord = require("discord.js");
db = require("megadb")
blacklist = new db.crearDB("blacklist");
module.exports = {
    name: 'embedsay',
   

    async execute(client, message, args) {
        const permission = message.member.permissions.has("ADMINISTRATOR");
        if (!permission)
        return message.reply(
          "❌ | No tienes permisos para usar este comando!")

          let embed = new Discord.MessageEmbed();
          if(!args) return message.channel.send('Pon un titulo!')
          args[0] = "";
          let reason = args.slice(1).join(" ");
          embed.setDescription(reason);
         if (!reason) return message.reply({content: `Porfavor, por un texto.`})
     
           message.channel.send({embeds: [embed]});
       }}
   