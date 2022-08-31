const Discord = require("discord.js");
db = require("megadb")
blacklist = new db.crearDB("blacklist");
module.exports = {
    name: 'unblacklist',
    aliases: ['unbl'],
   

    async execute(client, message) {
        if(message.author.id !=='826436794845364264') 
        return message.channel.send(`**»** ${message.author}, este comando solo puede ser usado por carpodi#0069.`);
        let user = message.mentions.members.first()
        if(!user) return message.channel.send('Menciona alguien para ser eliminado de la blacklist.')
        let role = message.guild.roles.cache.find(r => r.id === "988311863366406184");
      
    const noob = blacklist.has(user.id) 
    if (!noob) return message.channel.send({content: "Este usuario no esta en la blacklist."})

      blacklist.eliminar(user.id, user.user.tag)
      await user.roles.remove(role)
      let embedbl = new Discord.MessageEmbed()
      .setTitle('Usuario Removido de la blacklist')
      .setDescription(`El usuario ${user.user.username} ha sido removido de la blacklist.`)
      .addFields(
        { name: '**Rol Eliminado**' , value:`${role.name}` },)
      message.channel.send({embeds:[embedbl]})
      
      
         }
         }
        
      
