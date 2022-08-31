const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js') 
module.exports = {
    name: 'strike',
    aliases: ['warn'],

  async  execute(client, message,args ) {
    let author = message.author
    let member = message.mentions.members.first();
     if (!member) return message.reply(`❌ | Menciona un usuario!`);
if (!message.member.roles.cache.has("996244974955929691")) return message.reply(`**»** ${message.author}, este comando solo puede ser usado por <@&996244974955929691> en adelante`)
    let permission = author.member.permissions.has("ADMINISTRATOR");
        if (!permission)return message.reply("**»** ${message.author}, este comando solo puede ser usado por <@&996244974955929691> en adelante")
    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'No especificado!';  
  let embed = new Discord.MessageEmbed()
  .setTitle(`Usuario Advertido`)
  .setDescription(`El usuario ${member.user.username}#${member.user.discriminator} recibio una advertencia`)
  .addFields(
    {name:"Motivo:", value:`${reason}`},
    {name:"ID de usuario:", value:`${member.id}`} )
    .setFooter(`Moderador responsable: ${author.username}`)
     let embed2 = new Discord.MessageEmbed()
    .setTitle(`Usuario Advertido`)
    .setDescription(`El usuario ${member.user.username}#${member.user.discriminator} recibio una advertencia`)
    .addFields(
      {name:"Motivo:", value:`${reason}`},
      {name:"ID de usuario:", value:`${member.id}`},
      {name: "Moderador responsable:", value: `${author.username}`}
      )
      .setFooter('Nota: Estas advertencias son guardadas.')
      message.channel.send({embeds: [embed2]})

    client.guilds.cache.get("985249241381339137").channels.cache.get("996258427586216017").send({embeds:[embed]})}
  }