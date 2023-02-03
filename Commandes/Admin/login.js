const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({
    name : "login",
    description : "Permet d'avoir les logins du VPS", 
    permission : Discord.Permissions.FLAGS.ADMINISTRATOR, 
    category : "Admin",
    use: "login", 
    async run(bot, message, args,db){
        if(!message.author.id === "1057616889603440690") {
            message.reply("> Vous n'avez pas le droit d'exécuter cette commande")
        } else if (!message.author.id === "662306628577787925"){
            message.reply("> Vous n'avez pas le droit d'exécuter cette commande")
        } else {
            message.delete()
                let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setFooter({text : bot.user.username + ` ©️ Prism Bots`, iconURL : bot.user.avatarURL({dynamic : true})})
                .setTitle("Login VPS")
                .addFields({name: 'Host', value: '81.28.252.103' },{name: 'Port', value: '22'}, {name: 'Username', value: 'root'}, {name: 'Password', value: 'PrismBotInformatique/'})
                message.author.send({embeds : [Embed]})
            }
    }
})