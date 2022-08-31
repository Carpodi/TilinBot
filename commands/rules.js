const Discord = require('discord.js');
module.exports = {
  name: 'rules',

  execute(client, message) {
    const embed = new Discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL())
    .setTitle(`**Reglas del servidor**`)
    .addFields(
        {name:"‎", value:"❭ 1 - Esta prohibido molestar/Faltar el respeto a los demas usuarios"},
        {name:"‎", value:"❭ 2 - Evita hacer comentarios tóxicos que puedan afectar al desarrollo en comunidad.(indirectas hacía el staff u otros usuarios, difamaciones de la misma forma, etc.)"},
        {name:"‎", value:"❭ 3 - Evitar colocarse Nicknames/Apodos/fotos de perfil inadecuadas. (Que se consideren walltext, flood, untageables, fotos nsfw)"},
        {name:"‎", value:"❭ 4 - Evitar hablar o conversar sobre temas delicados. (Religión, genocidio o política, temas de polémica en general)."},
        {name:"‎", value:"❭ 5 - No hacer flood/Walltext/Zalgo de cualquier tipo. Letras de canciones, reaccionar constantemente cada mensaje, poner más de 5 emojis en un mensaje, etc."},
        {name:"‎", value:"❭ 6 -  No pedir roles al staff."},
        {name:"‎", value:"❭ 7 - No hablar de temas que podrían incomodar a otros usuarios del servidor (Charlas de fetiches, sexroll,temas sexuales incomodos, etc…)"},
        {name:"‎", value:"❭ 8 - No satures tu micrófono de forma que moleste a los otros usuarios cuanto estes en un chat de voz."},
        {name:"‎", value:"❭ 9 - Mandar contenido multimedia que contenga material epileptico/audios extremadamente saturados y crashers."},
        {name:"‎", value:"❭ 10 Usar los canales correctamente.  (No usar comandos en el chat general, No usar la economía en el canal de comandos , etc.)"},
        {name:"‎", value:"❭ 11 Evitar hacer demasiadas menciones a los owners o a el staff "},
        {name:"‎", value:"❭ 12 La regla más importante es usar el sentido común. Si estás aquí eres lo suficientemente capaz de distinguir entre lo que está bien y lo que está mal."},
        {name:"‎", value:"❭ 13 Cualquier comportamiento, racista, homofobo, clasista, polemico etc. Sera sancionado por miembros del staff sin previo aviso."},
        {name:"‎", value:"El romper o incumplir cualquiera de etas normas llevara una sancion. La sancion puede variar respecto al staff que la aplique."},

    )
    .setFooter(`${message.guild.name}`)
    message.channel.send({embeds: [embed]})
  }}