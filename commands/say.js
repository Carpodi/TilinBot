const Discord = require("discord.js");
//Import Packages


module.exports = {
    name: 'say',
    async execute(client, message, args) {
    let msg;
    let textchannel = message.mentions.channels.first() //find the channel you mention in the cmd
    
    if(!message.member.permissions.has('MANAGE_MESSAGES')) { 
        return message.reply({ content: '**No tienes permisos para usar este comando.**' }) 
    } else if(!args[0]) { 
        return message.reply({ content: '**Porfavor, especifica que quieres decir.**'})
    }else if(textchannel) {
    message.delete()
        msg = args.slice(1).join(' ');
        client.channels.cache.get(textchannel.id).send({ content: msg }) 
    }else{
      message.delete()
        msg = args.join(' '); 
        message.channel.send({ content: msg })
    }
}
}