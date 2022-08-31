module.exports = {
    name: 'rcreate',
   async execute(client, message, args) {
    const permissions = message.member.permissions.has('ADMINISTRATOR')
    if (!permissions) return message.reply(':x: | No tienes permisos suficientes!');
    let name = args.join(' ');
    let guild = message.guild 
   guild.roles.create({
        name: `${name}`,
        guild_id: `${guild.id}`, // required
        color: 00000,
        hoist: false,
        mentionable: true })}}