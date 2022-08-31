const Discord = require('discord.js');
const config = require('../config.js');
module.exports = {
  name: 'sorteos',
 async execute(client, message) {
  const select = new Discord.MessageSelectMenu().setCustomId("select").setPlaceholder("Selecciona el tipo de sorteos que deseas revisar.").addOptions([
    {
      label: '🎉 Sorteos Normales ',
      description: 'Revisa los sorteos normales/sin requisitos del servidor',
      value: 'normal',
    },
    {
      label: "⚙ Sorteos con requsitos!",
      description: "Estos son los sorteos con requisitos.",
      value: "guildReq"
    },
  ])
  const row = new Discord.MessageActionRow().addComponents([select])
  let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === `${message.guild.id}` && !g.ended);
  if (!giveaways.some(e => e.messageId)) {
    return message.reply('💥 No hay sorteos activos.')
  }
  const msg = await message.reply({ embeds: [new Discord.MessageEmbed().setDescription("Selecciona una opcion en el menu.").setColor("RAMDOM").setTimestamp()], components: [row] })
  let embed = new Discord.MessageEmbed()
    .setTitle("Sorteos activos actualmente.")
    .setColor("RANDOM")
    .setFooter({
      text: `${client.user.username}`, 
      iconURL: client.user.displayAvatarURL()
    })
    .setTimestamp()
  let embedGuild = new Discord.MessageEmbed()
    .setTitle("Sorteos con requisitos activos actualmente.")
    .setColor("#2F3136")
    .setFooter({
      text: `${client.user.username}`, 
      iconURL: client.user.displayAvatarURL()
    })    
    .setTimestamp()

  const filter = x => x.customId == "select" && x.user.id == message.author.id
  const collector = await message.channel.createMessageComponentCollector({ filter, time: 60000, max: 1 })
  collector.on("collect", async (i) => {
    i.update({ components: [] });
    const val = i.values[0]
    if (val == "normal") {
      await Promise.all(giveaways.map(async (x) => {
        embed.addField(`Sorteo normal:`, `**Premio:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})\nInicio:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Termina:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
      }));
     msg.edit({ embeds: [embed] })
    }
    if (val == "guildReq") {
      if (!giveaways.some(e => e.extraData)) return msg.edit({ content: '💥 No hay sorteos activos!', embeds: [] }).catch(e => console.error(e))
      await Promise.all(giveaways.map(async (x) => {
        if (x.extraData) {
          const guild = client.guilds.cache.get(x.extraData.server)
          const channel = guild.channels.cache
            .filter((channel) => channel.type === 'text')
            .first()
          const inv = await channel.createInvite()
          embedGuild.addField(`Sorteo con requisitos`, `**Premio:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})**\n**Requisito: Unirse a [Este](${inv} servidor.)**\n**Inicio:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Termina:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
        }
      }));
      msg.edit({ embeds: [embedGuild] })
    }
  })
  collector.on("end",(collected, reason) => {
   if(reason == "time")
   msg.edit({ content: "Hubo un error! Revisa la consola para mas detalles.", components: [] })
  })
}
}
