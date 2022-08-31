module.exports = {
    name: 'leave',
  
    execute(client, message, args) {
        if(message.author.id !=='826436794845364264') 
        return message.channel.send(`**»** ${message.author}, you don't have permission to do that!`);
        message.channel.send('Server de mierda!')
    message.guild.leave()
    }
       }
    