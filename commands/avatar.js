const Discord = require('discord.js');
module.exports = {
  name: 'avatar',

  execute(client, message) {
     {    let user = message.mentions.users.first() || message.author;
        let embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setTitle(`Avatar de ${user.username}`)
          .setDescription(
            `[Avatar](${user.displayAvatarURL({
              size: 2048,
              dynamic: true,
              format: "png",
            })})`
          )
          .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));
    
        message.channel.send({ embeds: [embed] });
        message.delete();
        }}}