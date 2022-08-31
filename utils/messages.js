
const config = require('../config.js');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **Sorteo** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **Sorteo terminado** 🎉",
  drawing:  `Termina: **{timestamp}**`,
  inviteToParticipate: `Reacciona con 🎉 para participar!`,
  winMessage: " Felicidades, {winners}! eres el ganador de **{this.prize}**!",
  embedFooter: "Sorteos",
  noWinner: "Sorteo cancelado! No hay participantes.",
  hostedBy: "Hecho por: {this.hostedBy}",
  winners: "Ganador(es)",
  endedAt: "Termino"
}