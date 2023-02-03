const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({
    name : 'unlock', 
    description : "Permet de déverrouiller un salon.", 
    category : "Administration", 
    permission : Discord.Permissions.FLAGS.ADMINISTRATOR, 
    use: "unlock",
    cooldown : 10, 

    async run(bot, message, args, db) {
        let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(' ')
        if(!reason) reason = "Aucune raison fournie."
        let channel = message.user ? message.guild.channels.cache.get(args._hoistedOptions[0].value) : (message.mentions.channels.first() || message.guild.channels.cache.get(args[0]))
        let EmbedErrNotFind = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("Une erreur est survenue !")
        .setDescription("Aucun salon trouvé !")
        .setFooter({text : bot.user.username, iconURL : bot.user.avatarURL({dynamic : true})})
        .setTimestamp()
        let EmbedErrAlreadyLock = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("Une erreur est survenue !")
        .setDescription("Ce salon est déjà déverrouillé")
        .setFooter({text : bot.user.username, iconURL : bot.user.avatarURL({dynamic : true})})
        .setTimestamp()
        let EmbedLocked = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`
Le salon ${channel} a été déverrouillé avec succès par ${message.author} 
Raison : \`${reason}\`        
        `)
        .setFooter({text : bot.user.username, iconURL : bot.user.avatarURL({dynamic : true})})
        .setTimestamp()
        if(!channel) return message.reply({embeds : [EmbedErrNotFind]})

       

        if(channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id)?.allow.toArray(false).includes("SEND_MESSAGES")) return message.reply({embeds : [EmbedErrAlreadyLock]})
        await channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {
            SEND_MESSAGES: true, 
        })

        await channel.send({embeds : [EmbedLocked]}).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 3000);
        })
        await message.reply({embeds : [EmbedLocked]})
    }
})