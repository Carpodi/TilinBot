const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'setup',

    execute(client, message) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.channel.send('No tienes permisos para usar esto!❌');
        }

        const setupEmbed = new MessageEmbed()

        .setColor('GREEN')
        .setTitle('**Tickets**')

        .addFields(
            { name: '・┇ Haz click en el botón que está bajo éste mensaje siempre y cuando sea necesario' , value:'‎' },
            { name: '・┇ El Bot te mencionará en un canal y será ahí donde coloques tu duda/queja/etcétera', value: '‎' },
            {name: ' ⚠️EL MAL USO DE ÉSTE SISTEMA ES SANCIONADO⚠️', value: '‎' },
            {name: '・┇ Mal uso: Abrir por trollear o curiosidad.', value: '‎' },
        )
        .setFooter(`${message.guild.name}${message.guild.icon()}`)
        .setTimestamp()
        
        const ticketButton = new MessageButton();

        ticketButton.setEmoji('🔓');
        ticketButton.setStyle('SUCCESS');
        ticketButton.setLabel('Abrir un ticket');
        ticketButton.setCustomId('createTicket');

        const row = new MessageActionRow().addComponents(ticketButton);

        message.channel.send({ embeds: [setupEmbed], components: [row] });
    },
};