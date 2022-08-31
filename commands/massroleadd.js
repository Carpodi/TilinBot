const Discord = require('discord.js')
const { Permissions } = require('discord.js');
module.exports = {
    name: 'applyr',
  
    execute(client, message) {   const Role = message.mentions.roles.first();
        if(message.author.id !=='826436794845364264') 
        return message.channel.send(`**»** ${message.author}, este comando solo puede ser usado por carpodi#0069.`);
        message.mentions.members.forEach(member => {
            member.roles.add(Role).catch(e => console.error(e));
        });
    
        message.channel.send(`El rol ${Role.name} fue agregado a los usuarios ${message.mentions.members.map(member => member.user.tag).join(", ")}.`);
    }}