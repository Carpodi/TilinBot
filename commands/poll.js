const Discord = require('discord.js');
module.exports = {
    name: 'poll',

    execute(client, message, args) {
        const permissions = message.member.permissions.has('MANAGE_MESSAGES') 
        if (!permissions) return message.reply(':x: | No tienes permisos suficientes! Necesitas el permiso `MANAGE_MESSAGES`');
const author = message.member
const desc = args.join(' ');
args[0] = "";
let embed = new Discord.MessageEmbed();
embed.setTitle("**Encuesta!**");
embed.setDescription(desc);
if(!desc) return message.channel.send('Pon una encuesta!')
embed.setFooter(`Hecha por: ${author.user.username}\#${author.user.discriminator}`,author.user.avatarURL())
message.channel.send({ embeds: [embed] }).then(message => {
   message.react("✅")
   message.react("❌")

})
}}
