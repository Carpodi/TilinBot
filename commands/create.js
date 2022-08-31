const Discord = require('discord.js'),
  { MessageEmbed } = Discord,
  parsec = require('parsec'),
  messages = require('../utils/messages');
  module.exports = {
    name: 'sorteo',
   async execute(client, message) {
  const collector = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id,
    time: 60000,
  });

  let xembed = new MessageEmbed()
  .setTitle("Vaya! Se te acabo el tiempo.")
  .setColor("RANDOM")
  .setDescription('Tardaste demasiado en responder!!\nUse ``=sorteo`nuevamente.')
  .setFooter({
     text: `${client.user.username}`,
     iconURL: client.user.displayAvatarURL()
  })  
  .setTimestamp()
  if (
    !message.member.permissions.has("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.reply(
      ":x: | No tienes permisos suficientes! Necesitas el permiso `MANAGE_MESSAGES` o un rol llamado `Giveaways`."
    );

  function waitingEmbed(title, desc) {
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(`**Sorteos**`)
       
          .setTitle('Sorteo' + title)
          .setDescription(desc + ' En los proximos 60 segundos.')
          .setFooter({
            text: "Escribe `cancel` para salir del editor.",
            iconURL: client.user.displayAvatarURL()
           })
          .setTimestamp()
          .setColor('#2F3136'),
      ],
    });
  }

  let winnerCount, channel, duration, prize, cancelled;

  await waitingEmbed('Premio', 'Porfavor, especifica el premio.');

  collector.on('collect', async (m) => {
    if (cancelled) return;

    async function failed(options, ...cancel) {
      if (typeof cancel[0] === 'boolean')
        (cancelled = true) && (await m.reply(options));
      else {
        await m.reply(
          options instanceof MessageEmbed ? { embeds: [options] } : options
        );
        return await waitingEmbed(...cancel);
      }
    }

    if (m.content === 'cancel'){ 
  collector.stop()
 return await failed('La creacion del sorteo fue cancelada.', true) 
}

    switch (true) {
      case !prize: {
        if (m.content.length > 256)
          return await failed(
            'El premio no puede tener más de 256 caracteres.',
            'Prermio',
            'Por favor, envíe el premio del sorteo'
          );
        else {
          prize = m.content;
          await waitingEmbed('Canal', 'Por favor, envíe el canal del sorteo');
        }

        break;
      }

      case !channel: {
        if (!(_channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content)))
          return await failed(
            'Por favor, envíe un canal / ID de canal válido',
            'Canal',
            'Por favor, envíe el canal del sorteo'
          );
        else if (!_channel.isText())
          return await failed(
            'El canal debe ser un canal de texto',
            'Canal',
            'Por favor, envíe el canal del sorteo'
          );
        else {
          channel = _channel;
          await waitingEmbed(
            'Ganadores',
            'Por favor, envíe el numero de ganadores del sorteo',
          );
        }

        break;
      }

      case !winnerCount: {
        if (!(_w = parseInt(m.content)))
          return await failed(
            'El número de ganadores debe ser un número entero',

            'Ganadores',
            'Por favor, envíe el numero de ganadores del sorteo.'
          );
        if (_w < 1)
          return await failed(
            'Winner count must be more than 1.',
            'Winner Count',
            'Please send the giveaway winner count.'
          );
        else if (_w > 15)
          return await failed(
            'El numero de ganadores debe ser inferior a 15.',
            'Ganadores',
            'Por favor, envíe el numero de ganadores del sorteo.'
          );
        else {
          winnerCount = _w;
          await waitingEmbed('Duración','Por favor, envíe la duración del sorteo');
        }

        break;
      }

      case !duration: {
        if (!(_d = parsec(m.content).duration))
          return await failed(
            'Por favor, indique una duración válida',
            'Duración',
            'Por favor, envíe la duración del sorteo'
          );
        if (_d > parsec('21d').duration)
          return await failed(
            "La duración debe ser inferior a 21 días",
            'Duración',
            'Por favor, envíe la duración del sorteo'
          );
        else {
          duration = _d;
        }

        return client.giveawaysManager.start(channel, {
          prize,
          duration,
          winnerCount,
          messages,
          hostedBy: client.config.hostedBy && message.author,
        });
      }
    }
  });
  collector.on('Termina:', (collected, reason) => {
    if (reason == 'time') {
       message.reply({ embeds: [xembed]})
    }
  })
   }}}