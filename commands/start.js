const Discord = require('discord.js')
const ms = require("ms");
const messages = require("../utils/messages");
module.exports = {
  name: 'start',
 async execute(client, message, args) {

  const embedu = new Discord.MessageEmbed()
  .setTitle("**Uso Invalido!**")
  .setDescription("Uso: !start `<canal>` | `<duracion>` | `<ganador(es)>` | `<premio>`")
  if (
    !message.member.permissions.has("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.reply(
      ":x: | No tienes permisos suficientes! Necesitas el permiso `MANAGE_MESSAGES` o un rol llamado `Giveaways`."
    );
  }

  // Giveaway channel
  let giveawayChannel = message.mentions.channels.first();
  // If no channel is mentionned
  if (!giveawayChannel) {
    return message.reply({embeds:[embedu]})
  }

  // Giveaway duration
  let giveawayDuration = args[1];
  // If the duration isn't valid
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.reply({embeds:[embedu]})
  }

  // Number of winners
  let giveawayNumberWinners = parseInt(args[2]);
  // If the specified number of winners is not a number
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.reply({embeds:[embedu]})
  }

  // Giveaway prize
  let giveawayPrize = args.slice(3).join(" ");
  // If no prize is specified
  if (!giveawayPrize) {
    return message.reply({embeds:[embedu]}) }
  // Start the giveaway
  await client.giveawaysManager.start(giveawayChannel, {
    // The giveaway duration
    duration: ms(giveawayDuration),
    // The giveaway prize
    prize: giveawayPrize,
    // The giveaway winner count
    winnerCount: parseInt(giveawayNumberWinners),
    // Who hosts this giveaway
    hostedBy: client.config.hostedBy ? message.author : null,
    // Messages
    messages
  });
  message.reply(`Exito! Sorteo iniciado en el canal ${giveawayChannel}!`);
}}