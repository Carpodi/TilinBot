const { createWriteStream } = require('fs');
const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');

module.exports = async (client, int) => {
    const req = int.customId.split('_')[0];


    client.emit('ticketsLogs', req, int.guild, int.member.user);

    switch (req) {
        case 'createTicket': {
            const selectMenu = new MessageSelectMenu();

            selectMenu.setCustomId('newTicket');
            selectMenu.setPlaceholder('Elige una razon para tu ticket.');
            selectMenu.addOptions([
                {
                    emoji: '🎫',
                    label: 'Soporte',
                    description: 'Contacta con el equipo de soporte.',
                    value: 'newTicket_Support'
                },
                {
                    emoji: '❗',
                    label: 'Creador de contenido.',
                    description: 'Aplica a ser creador de contenido.',
                    value: 'newTicket_Apply'
                },
            ]);

            const row = new MessageActionRow().addComponents(selectMenu);

            return int.reply({ content: 'Cual es el motivo del ticket?', components: [row], ephemeral: true });
        }


        
        case 'newTicket': {
            const reason = int.values[0].split('_')[1];

            const ticketEmbed = new MessageEmbed();
            ticketEmbed.setColor('GREEN');
            ticketEmbed.setAuthor(`Ticket creado con exito ${int.member.user.username}${reason ? ` (${reason})` : ''} ✅`);
            ticketEmbed.setDescription('*Para cerrar el ticket presiona el boton abajo. Advertencia: No es posible revertir esta accion!*');
        
            const closeButton = new MessageButton();
        
            closeButton.setStyle('DANGER');
            closeButton.setLabel('Cerrar');
            closeButton.setCustomId(`closeTicket_${int.member.id}`);
        
            const row = new MessageActionRow().addComponents(closeButton);
            const channel = int.guild.channels.cache.find(x => x.name === `ticket-${int.member.user.username}`);

            if (!channel) {
                await int.guild.channels.create(`ticket-${int.member.user.username}`, {
                    type: 'GUILD_TEXT',
                    parent: '986412048344829993',
                    topic: `Ticket creador por ${int.member.id}${reason ? ` (${reason})` : ''} ${new Date(Date.now()).toLocaleString()}`,
                    permissionOverwrites: [
                        {
                            id: int.guild.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        {
                            id: int.member.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        {
                            id: client.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        
                    ]
                }).then(channel => {channel.send({content: `${author.user}, <@&985636088972456006>`})
                channel.send({embeds: [ticketEmbed], components: [row] });  })
    

     
                const channel = int.guild.channels.cache.find(x => x.name === `ticket-${int.member.user.username}`);
            return int.update({ content: `Tu ticket esta abierto. <@${int.member.user.id}><#${channel.id}> ✅`, components: [], ephemeral: true });
            } else {
                return int.update({ content: `Ya tienes un ticket abierto. <#${channel.id}> ❌`, components: [], ephemeral: true });
            }
        }

        case 'closeTicket': {
            const channel = int.guild.channels.cache.get(int.channelId);

            await channel.edit({
                permissionOverwrites: [
                    {
                        id: int.guild.id,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: int.customId.split('_')[1],
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: client.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ]
            });

            const ticketEmbed = new MessageEmbed();

            ticketEmbed.setColor('RED');
            ticketEmbed.setAuthor(`${int.member.user.username} Cerro el ticket ❌`);
            ticketEmbed.setDescription('*Para borrar o guardar el ticket, sigue las opciones abajo.*');

            const reopenButton = new MessageButton();

            reopenButton.setStyle('SUCCESS');
            reopenButton.setLabel('Reabrir el ticket');
            reopenButton.setCustomId(`reopenTicket_${int.customId.split('_')[1]}`);

            const saveButton = new MessageButton();

            saveButton.setStyle('SUCCESS');
            saveButton.setLabel('Guardar el ticket');
            saveButton.setCustomId(`saveTicket_${int.customId.split('_')[1]}`);

            const deleteButton = new MessageButton();

            deleteButton.setStyle('DANGER');
            deleteButton.setLabel('Borrar el ticket');
            deleteButton.setCustomId('deleteTicket');

            const row = new MessageActionRow().addComponents(reopenButton, saveButton, deleteButton);

            return int.reply({ embeds: [ticketEmbed], components: [row] });
        }

        case 'reopenTicket': {
            const channel = int.guild.channels.cache.get(int.channelId);

            await channel.edit({
                permissionOverwrites: [
                    {
                        id: int.guild.id,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: int.customId.split('_')[1],
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: client.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ]
            });

            const ticketEmbed = new MessageEmbed();

            ticketEmbed.setColor('GREEN');
            ticketEmbed.setAuthor(`El ticket fue reabierto`);
            ticketEmbed.setDescription('*Para cerrar el ticket presiona el boton abajo. Advertencia: No puedes revertir esta accion!*');

            const closeButton = new MessageButton();

            closeButton.setStyle('DANGER');
            closeButton.setLabel('Cerrar');
            closeButton.setCustomId(`closeTicket_${int.customId.split('_')[1]}`);

            const row = new MessageActionRow().addComponents(closeButton);

            return int.reply({ embeds: [ticketEmbed], components: [row] });
        }

        case 'deleteTicket': {
            const channel = int.guild.channels.cache.get(int.channelId);

            return channel.delete();
        }

        case 'saveTicket': {
            const channel = int.guild.channels.cache.get(int.channelId);

            await channel.messages.fetch().then(async msg => {
                let messages = msg.filter(msg => msg.author.bot !== true).map(m => {
                    const date = new Date(m.createdTimestamp).toLocaleString();
                    const user = `${m.author.tag}${m.author.id === int.customId.split('_')[1] ? ' (ticket creator)' : ''}`;

                    return `${date} - ${user} : ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`;
                }).reverse().join('\n');

                if (messages.length < 1) messages = 'There are no messages in this ticket... strange';

                const ticketID = Date.now();

                const stream = await createWriteStream(`./backups/${ticketID}.txt`);

                stream.once('open', () => {
                    stream.write(`User ticket ${int.customId.split('_')[1]} (channel #${channel.name})\n\n`);
                    stream.write(`${messages}\n\nLogs ${new Date(ticketID).toLocaleString()}`);

                    stream.end();
                });

                stream.on('finish', () => int.reply({ files: [`./backups/${ticketID}.txt`] }));
            });
        }
    }}