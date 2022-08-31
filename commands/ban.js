const Discord = require("discord.js");
db = require("megadb")
blacklist = new db.crearDB("blacklist");
module.exports = {
    name: 'ban',
   

    async execute(client, message, args) {
        const permission = message.member.permissions.has("BAN_MEMBERS");
        if (!permission)
        return message.reply(
          "❌ | No tienes permisos para usar este comando!"
        );
        let member = message.mentions.members.first();
        if (!member) return message.reply(`❌ | Menciona un usuario!`);
        let author = message.author;
  let reason = args.slice(1).join(" ");
  if (!reason) reason = 'No especificado!';

    //embed 
    let bane = new Discord.MessageEmbed()
    .setTitle('Usuario Baneado')
    .setDescription(`El usuario ${member.user.tag} ha sido baneado.`)
    .addFields(
    {name:"‎", value:`Motivo: ${reason}`},
    {name:"‎", value:`ID de usuario: ${member.id}`} )
    .setFooter(`Moderador responsable: ${author.username}`)
    
        if (member.id === message.author.id)
          return message.reply(`❌ | No puedes banearte a ti mismo!`);
    
        if (message.member.roles.highest.position < member.roles.highest.position)
          return message.reply(
            `❌ | No puedes banear un usuario con mayor jerarquia que tu.`
          );
    
        if (!member.bannable) return message.reply(`❌ | No puedo banear ese usuario!`);
    
        return (
          (await member.ban({reason: `Baneado por: ${author.username} Motivo: ${reason}`})) +
          message
            .reply({
              embeds: [bane],
            })
       
        );
        {
      }
    }}
    