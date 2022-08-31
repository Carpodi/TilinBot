const Discord = require("discord.js");
db = require("megadb")
blacklist = new db.crearDB("blacklist");
module.exports = {
    name: 'blacklistu',
    aliases: ['blusers'],
   

    async execute(client, message) {
        let user = message.mentions.members.first()
        const noob = blacklist.has(user.id) 
        //false embed
        const fembed = new Discord.MessageEmbed()
        .setTitle("Lista de blacklist!")
        .setTitle(`El usuario ${user.user.username} no esta en la blacklist`)
                //true embed
                const tembed = new Discord.MessageEmbed()
                .setTitle("Lista de blacklist!")
                .setDescription(`El usuario ${user.user.username} esta en la blacklist`)
        if (!noob) return message.channel.send({embeds: [fembed]})
        else { 
            message.channel.send({embeds: [tembed]})
        }
    }}