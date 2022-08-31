const Discord = require('discord.js');
module.exports = {
  name: 'boosters',

  execute(client, message) {
    const embed = new Discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL())
    .setTitle(`**Beneficios Boosters**`)
    .addFields(
        {name:"‎", value:"El link de amistad de uno de los Tilines del servidor."},
        {name:"‎", value:"El rol <@&985613277612630159> el cual tiene una insignia exclusiva."},
        {name:"‎", value:"Acceso a diversos canales VIP."},
        {name:"‎", value:"Income de 500k en economia cada 24 Horas."},
        {name:"‎", value:"Acceso a un canal de sorteos VIP."},
        {name:"‎", value:"Aparecer en la lista de los usuarios activos unicamente por debajo del staff."},
        {name:"‎", value:"Prioridad en el soporte."},
        {name:"‎", value:"Economia VIP [Proximamente]"},
    )
    .setFooter(`${message.guild.name}`)
    message.channel.send({embeds: [embed]})
  }}