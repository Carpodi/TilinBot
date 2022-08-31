const Discord = require('discord.js')
module.exports = {
    name: 'help',
    async execute(client, message) {
      const embedm = new Discord.MessageEmbed()
.setTitle("**Comandos Tilin Bot**")
.setColor("BLACK")
.addFields(
  { name: '**General**' , value:'`Comandos Generales`' },
  { name: '=avatar', value: 'Te muesta el avatar de un usuario' },
  { name: '=userinfo', value: 'Te muesta la informacion de un usuario' },
  { name: '**Sorteos**' , value:'`Comandos de sorteos`' },
  { name: '=sorteo', value: 'Creas un sorteo' },
  { name: '=start', value: 'Inicias un sorteo' },
  { name: '=end', value: 'Terminas el sorteo' },
  { name: '=reroll', value: 'Re=lanza el sorteo' },
  {name: '=list', value: 'Lista de sorteos activos.' },
  {name: '**Administracion**' , value:'`Te muestra comandos de la administracion`' },
  {name: '=setup', value: 'Panel de tickets' },
)
const m = await message.channel.send({ embeds:[embedm]})

    }}