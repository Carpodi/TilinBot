module.exports = (client, type, guild, user) => {
    switch (type) {
        case 'newTicket': {
            return console.log(`${user.username} Creo un ticket en ${guild.name}`);
        }

        case 'closeTicket': {
            return console.log(`${user.username} Cerro un ticket en ${guild.name}`);
        }

        case 'reopenTicket': {
            return console.log(`${user.username} Reabrio un ticket en ${guild.name}`);
        }

        case 'deleteTicket': {
            return console.log(`${user.username} Borro un ticket en ${guild.name}`);
        }

        case 'saveTicket': {
            return console.log(`${user.username} Guardo un ticket en ${guild.name}`);
        }
    }
};