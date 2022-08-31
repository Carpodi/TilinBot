const Discord = require('discord.js');
module.exports = {
  name: 'demote',
  async execute(client, message, args) {
    message.delete(1000);
    let user = message.mentions.members.first()
    const canal = client.channels.cache.find(channel => channel.name === '⚒・movimiento-staff')
    const role1 = message.guild.roles.cache.find(r => r.id === "991011701333835796");
    const permissions = message.member.permissions.has('ADMINISTRATOR')
    if (!permissions) return message.reply(':x: | No tienes permisos suficientes!');
    //embed
    let demote = new Discord.MessageEmbed()
    .setTitle(`Usuario descendido`)   
    .setDescription(`El usuario ${user.user.username} ha sido descendido de ${role1.name} a 🔍・Ayudante `)
  if (user.roles.cache.has("991011891348406292"))  {
    await user.roles.remove(role1).then(channel => canal.send({embeds:[demote]}))
  } else {
    messsage.channel.send({content: `El usuario ${user.user.username} no es staff!`})
  }}}