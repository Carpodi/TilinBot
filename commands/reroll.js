const ms = require('ms');
module.exports = {
    name: 'reroll',
   async execute(client, message) {
    // If the member doesn't have enough permissions
    if(!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.reply(':x: | No tienes permisos suficientes! Necesitas el permiso `MANAGE_MESSAGES` o un rol llamado `Giveaways`.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.reply(':x: | Porfavor, pon el id del mensaje del sorteo.');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.reply('El id es invalido o el sorteo `'+ args.join(' ') +'`o no existe en la base de datos.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.reply('Exito! Sorteo re-lanzado!');
    })
    .catch((e) => {
        if(e.startsWith(`El sorteo: ${giveaway.messageID} no ha terminado.`)){
            message.reply('Este sorteo no ha terminado!');
        } else {
            console.error(e);
            message.reply(e);
        }
    });

   }}