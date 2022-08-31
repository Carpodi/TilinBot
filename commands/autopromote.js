const Discord = require('discord.js');
module.exports = {
  name: 'promote',
  async execute(client, message, args) {
    message.delete(1000);
    let user = message.mentions.members.first()
    const canal = client.channels.cache.find(channel => channel.name === '⚒・movimiento-staff')
    const role1 = message.guild.roles.cache.find(r => r.id === "991011701333835796");
    const permissions = message.member.permissions.has('ADMINISTRATOR')
    if (!permissions) return message.reply(':x: | No tienes permisos suficientes!');
    //embed
    let promote = new Discord.MessageEmbed()
    .setTitle(`Usuario Ascendido`)   
    .setDescription(`El usuario ${user.user.username} ha sido ascendido de 🔍・Ayudante a ${role1.name}`)
  if (user.roles.cache.has("991011891348406292"))  {
    await user.roles.add(role1).then(channel => canal.send({embeds:[promote]}))
  } else {
    messsage.channel.send({content: `El usuario ${user.user.username} no es staff!`})
  }}}