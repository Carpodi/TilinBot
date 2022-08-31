const Discord = require("discord.js");
db = require("megadb")
blacklist = new db.crearDB("blacklist");
module.exports = {
    name: 'blacklist',
    aliases: ['bl'],
   

    async execute(client, message) {
        if(message.author.id !=='826436794845364264') 
        return message.channel.send(`**»** ${message.author}, este comando solo puede ser usado por carpodi#0069.`);
        const canal = client.channels.cache.find(channel => channel.name === '🗃・blacklist-logs')

  let user = message.mentions.members.first()
  if(!user) return message.channel.send('Menciona el usuario a blacklistear')
  let role = message.guild.roles.cache.find(r => r.id === "988311863366406184");
  const role1 = message.guild.roles.cache.find(r => r.id === "991011701333835796");
  const role2 = message.guild.roles.cache.find(r => r.id === "991011891348406292");
  let demotecanal = client.channels.cache.find(channel => channel.name === '⚒・movimiento-staff')
  if(blacklist.has(user.id)) return message.channel.send({content: "Usuario ya blacklisteado."})
  //embed 1
let embedm = new Discord.MessageEmbed()
.setTitle('Roles elminados')
.setTitle(`El usuario se elimino el rol ${role1.name} del usuario ${user.user.username} por estar en la blacklist`)
//embed 2
let embedm2 = new Discord.MessageEmbed()
.setTitle('Roles elminados')
.setTitle(`El usuario se elimino el rol ${role2.name} del usuario ${user.user.username} por estar en la blacklist`)
//embed falsem
let embedfalse = new Discord.MessageEmbed()
.setTitle('No hubo exito!')
.setDescription(`El usuario ${user.user.username} no tenia el rol ${role1.name}.`)
//embed falsem
let embedfalse2 = new Discord.MessageEmbed()
.setTitle('No hubo exito!')
.setDescription(`El usuario ${user.user.username} no tenia el rol ${role2.name}.`)
//embedseco 
let embedseco = new Discord.MessageEmbed()
.setTitle('Usuario Demoteado!')
.setDescription(`El usuario ${user.user.username} ha sido removido del staff por estar en la blacklist`)
if (user.roles.cache.has("991011701333835796"))  {
  canal.send({embeds: [embedm]})
  demotecanal.send({embeds: [embedseco]})
} else {
  canal.send({embeds: [embedfalse]})
}
if (user.roles.cache.has("991011891348406292")) {
  canal.send({embeds: [embedm2]})
  demotecanal.send({embeds: [embedseco]})
} else {
  canal.send({embeds: [embedfalse2]})
}
blacklist.establecer(user.id, user.user.tag)
await user.roles.add(role) 
await user.roles.remove(role1)
await user.roles.remove(role2)

let embedbl = new Discord.MessageEmbed()

.setTitle('Usuario Blacklisteado')
.setDescription(`El usuario ${user.user.username} ha sido blacklisteado.`)
.addFields(
  { name: '**Rol Agregado**' , value:`${role.name}` },)
message.channel.send({embeds:[embedbl]})


   }
}
