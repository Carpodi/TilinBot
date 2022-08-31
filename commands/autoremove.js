const Discord = require('discord.js');
module.exports = {
  name: 'remove',
  async execute(client, message, args) {
    message.delete(1000);
    let user = message.mentions.members.first()
    const canal = client.channels.cache.find(channel => channel.name === '⚒・movimiento-staff')
    const role1 = message.guild.roles.cache.find(r => r.id === "991011701333835796");
    const role2 = message.guild.roles.cache.find(r => r.id === "991011891348406292");
    const permissions = message.member.permissions.has('ADMINISTRATOR')
    if (!permissions) return message.reply(':x: | No tienes permisos suficientes!');
    //embed
    let remove = new Discord.MessageEmbed()
    .setTitle(`Usuario Eliminado del staff!`)   
    .setDescription(`El usuario ${user.user.username} ha sido eliminado del staff.`)
  if (user.roles.cache.has("991011891348406292"))  {
    await user.roles.remove(role1)
    await user.roles.remove(role2).then(channel => canal.send({embeds:[remove]}))
  } else {
    messsage.channel.send({content: `El usuario ${user.user.username} no es staff!`})
  }}}