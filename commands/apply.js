const Discord = require('discord.js')
const { Permissions } = require('discord.js');
module.exports = {
    name: 'apply',
  
    execute(client, message) {
        message.delete(1000);
        const author = message.member
        const channel = message.guild.channels.cache.find(x => x.name === `apply-${author.user.username}`);
        const embed2 = new Discord.MessageEmbed()
        .setTitle(`**Entrevista staff**`)
        .setDescription("Responde las siguientes preguntas")
        .addFields(
            {name:"‎", value:"¿Porque deseas applicar al staff?"},
            {name:"‎", value: "¿Tienes experiencia en cargos como ese?" },
            {name:"‎", value:"¿Que edad tienes?"},
            {name:"‎", value:"¿Hablas otros idomas aparte del español?,Si es asi ¿Cuales?"},
            {name:"‎", value:"¿En que zona horaria te ubicas?(De ser posible, en formato GMT)"},
            {name:"‎", value:"¿Cuanto tiempo puedes dedicarle al servidor?"},
            {name:"‎", value: "¿Sabes programacion?"}
        )
        .setColor("BLACK")
        if (!channel)
        message.guild.channels.create(`Apply-${author.user.username}`, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.author.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                   id: '986403991124602940',
                   deny: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ]
             }).then(channel => {channel.send({content: `${author.user}`})
             channel.send({embeds: [embed2]});  })
             else {channel.send({content: `Ya tienes una apply abierta!`}); }
            }}

    