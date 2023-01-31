const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({
    name: "pic", 
    description: "Permet d'avoir la photo de profil d'un utilisateur", 
    permissions: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category : "Utilisateurs", 
    use : "pic (membre)", 
    async run(bot, message, args, db){
        let user; 
        if(message.user ? args._hoistedOptions.length > 0 : args.length > 0) {
            user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
            if(!user) message.reply("Aucun user trouvé.")
        } else user = message.user ? message.user : message.author
        let member = message.guild.members.cache.get(user.id)

        const Embed = new Discord.MessageEmbed()
        
        .setTitle(`Avatar de ${user.username}`)
        .setColor(bot.color)
        .setImage(user.avatarURL({dynamic : true, size : 4096}))
        .setFooter({text : bot.user.username + ` ©️ Prism Bots`, iconURL : bot.user.avatarURL({dynamic : true})})
        message.reply({embeds : [Embed]})
    }
})