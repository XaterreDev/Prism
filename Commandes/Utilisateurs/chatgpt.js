const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({
    name : "chatgpt", 
    description : "Permet de séléctionner le channel de ChatGPT", 
    permission : Discord.Permissions.FLAGS.ADMINISTRATOR, 
    category : "Utilisateurs",
    use: "chatgpt [channel]",

    async run(bot,message,args,db){
        let channel = message.user ? message.guild.channels.cache.get(args._hoistedOptions[0].value) : (message.mentions.channels.first() || message.guild.channels.cache.get(args[0]))
        let EmbedErrNotFind = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setTitle("Une erreur est survenue !")
            .setDescription("Aucun salon trouvé !")
            .setFooter({ text: bot.user.username, iconURL: bot.user.avatarURL({ dynamic: true }) })
            .setTimestamp()

        let EmbedAddedSuccess = new Discord.MessageEmbed()
        .setTitle("Le Module ChatGPT")
        .setDescription(`Le channel ${channel} a été ajouté comme channel pour parler a chagpt`)
        .setColor(bot.color)
        .setFooter({ text: bot.user.username, iconURL: bot.user.avatarURL({ dynamic: true })})
        .setTimestamp()
        if (!channel) return message.channel.send({ embeds: [EmbedErrNotFind] })

        db.query(`SELECT * FROM serveur WHERE guildID ${message.guild.id}`, async(err, req) => {
            
            db.query(`UPDATE serveur SET chatgptID = '${channel.id}' WHERE guildID = ${message.guild.id}`)
            console.log(`[LOGS] && Le module chatgpt a été activé sur ${message.guild.name}`)
            message.reply({ embeds : [EmbedAddedSuccess]})

        })
    }
})