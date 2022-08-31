const Discord = require('discord.js');
module.exports = {
  name: 'rulesstaff',

  execute(client, message) {
    const embed = new Discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL())
    .setTitle(`**Reglas del staff**`)
    .addFields(
        {name:"‎", value:"❭ **Como primera regla esta el leer las <#985251204948963410> del servidor.**"},
        {name:"‎", value:"❭ 1 - Esta prohibido el difundir contenido, conversaciones, o cualquier otro tema del staff."},
        {name:"‎", value:"❭ 2 - Esta prohibido el difundir tickets o cualquier reporte. Como staff debemos dar confidencialidad a los usuarios."},
        {name:"‎", value:"❭ 3 - NO Abusar de sus permisos como staff."},
        {name:"‎", value:"❭ 4 - NO Aplicar sanciones sin motivo aparente."},
        {name:"‎", value:"❭ 5 -  No pedir ascensos."},
        {name:"‎", value:"❭ 6 -  No hacer amenazas a los usuarios."},
        {name:"‎", value:"❭ 7 -  NO Se tolera toxicidad entre miembros del staff. Si tienes una incomodidad respecto a otro staff, haz un reporte en tickets."},


    )
    .setFooter(`${message.guild.name}`)
    message.channel.send({embeds: [embed]})
  }}