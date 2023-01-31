const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const format = require("../../Structure/formatTime")

module.exports = new Command({
    name: "credits", 
    description: "Permet de voir les crédits du bot", 
    permissions: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category : "Utilisateurs", 
    use : "credits", 
    async run(bot, message, args, db){
    
    const Embed = new Discord.MessageEmbed()
        
    .setTitle("Crédits du bot")
    .setColor(bot.color)
    .addFields(
    {name : "👑 Créateurs: ", value : `<@1057616889603440690>  \n <@662306628577787925>  \n <@684746139437891586>`, inline : true}, 
    {name: "🤖 Développeurs: ", value: `<@662306628577787925>  \n <@1057616889603440690>`, inline : true},
    {name: "🟢 Uptime :", value: format.formatTime(bot.uptime), inline : true},
    {name: "👥 Utilisateurs: ", value: `${bot.users.cache.size}`, inline : true},
    {name: "🌍 Serveurs:" , value: `${bot.guilds.cache.size}`, inline : true} 
    )
    .setImage(message.guild.iconURL({dynamic: true, size: 2048}))
    .setFooter({text : bot.user.username + ` ©️ Prism Bots`, iconURL : bot.user.avatarURL({dynamic : true})})
    message.reply({embeds : [Embed]})
    }
})
