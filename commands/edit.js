module.exports = {
  name: 'editars',
 async execute(client, message) {
  const Discord = require("discord.js");
  const ms = require("ms");
  let time = "";
  let winnersCount;
  let prize = "";
  let giveawayx = "";
  const permissions = message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")
  if (!permissions) return message.reply(':x: | No tienes permisos suficientes! Necesitas el permiso `MANAGE_MESSAGES` o un rol llamado `Giveaways`.');
  let embed = new Discord.MessageEmbed()
    .setTitle("Editor de sorteos!")
    .setColor('#2F3136')
    .setFooter({ 
      text: `${client.user.username}`, 
      iconURL: client.user.displayAvatarURL() 
    })
    .setTimestamp();

  const msg = await message.reply({
    embeds:
      [embed.setDescription(
        "Que sorteo te gustaria editar?\nPon el ID del mensaje.\n **Porfavor, responde en menos de 30 segundos!**"
      )]
  }
  
  );
  let xembed = new Discord.MessageEmbed()
    .setTitle("Oops! Se acabo el tiempo. 🕖")
    .setColor("#FF0000")
    .setDescription('Tardaste demasiado en decidir.\nUsa ``editars`` nuevamente para editar el sorteo!\nRecuerda que tienes un maximo de 30 segundos!')
    .setFooter({ 
      text: `${client.user.username}`, 
      iconURL: client.user.displayAvatarURL() 
    })
    .setTimestamp();

  const filter = m => m.author.id === message.author.id && !m.author.bot;
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  });

  collector.on("collect", async collect => {

    const response = collect.content;
    let gid = BigInt(response).toString()
    await collect.delete()
    if (!gid) {
      return msg.edit({
        embeds: [
          embed.setDescription(
            "Al parecer el id del mensaje es invalido o no existe en la base de datos!\n**Intenalo de nuevo.**\n"
          )]
      }
      );
    } else {
      collector.stop(
        msg.edit({
          embeds: [
            embed.setDescription(
              `Listo! Ahora especifica el nuevo tiempo del sorteo. \n** Tienes 30 segundos!**`
            )]
        }
        )
      );
    }
    const collector2 = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
    collector2.on("collect", async collect2 => {

      let mss = ms(collect2.content);
      await collect2.delete()
      if (!mss) {
        return msg.edit({
          embeds: [
            embed.setDescription(
              "Porfavor, indica una duracion valida."
            )]
        }
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit({
            embeds: [
              embed.setDescription(
                `Bien! Ahora, cuantos ganadores deseas?\n**Tienes 30 segundos!**`
              )]
          }
          )
        );
      }
      const collector3 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000,
        errors: ['time']
      });
      collector3.on("collect", async collect3 => {

        const response3 = collect3.content.toLowerCase();
        await collect3.delete()
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit({
            embeds: [
              embed.setDescription(
                "Porfavor, pon una cantidad valida de ganadores."
              )]
          }
          );
        } 
        const collector4 = await message.channel.createMessageCollector(
          filter,
          { max: 3, time: 30000 }
        );
        collector4.on("collect", async collect4 => {

          const response4 = collect4.content.toLowerCase();
          prize = response4;
          await collect4.delete()
          collector4.stop(
            console.log(giveawayx),
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Editado`
                )]
            }
            )
          );
          client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
          })
        });
      });
    });
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
      message.reply({ embeds: [xembed] });
    }
  })
  try {
    collector2.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    });
    collector3.on('end', (collected, reason) => {
      if (reason == 'time') {
        message.reply({ embeds: [xembed] });

      }
    })
    collector4.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    })
  } catch (e) { }
}}
