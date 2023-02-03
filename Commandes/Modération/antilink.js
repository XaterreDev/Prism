const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({
    name : "antilink", 
    description : "Permet d'activer ou de désactiver le mode anti-liens", 
    use : "[on/off]", 
    permission : Discord.Permissions.FLAGS.MANAGE_GUILD, 
    category: "Administration", 
    cooldown : 10,

    async run(bot, message, args, db){

        

        let choice = message.user ? args._hoistedOptions[0].value : args[0]
        if(!choice) return message.reply("Veuillez indiquer `on` ou `off`")

        let Embed = new Discord.MessageEmbed()
        .setTitle("Changement d'un statut d'un Module")
        .setDescription(`
\`${choice === "on" ? "🟢" : "🔴"}\` : **Anti Liens**
`)
        .setColor(bot.color)
       

        let EmbedStatut = new Discord.MessageEmbed()
        .setTitle("Statut du module d'Anti Raid")
        .setDescription(`
\`${choice === "on" ? "🟢" : "🔴"}\` : **Anti Liens**
`)
        .setColor(bot.color)

        if(choice !== "on" && choice !== "off") return message.channel.send("Veuillez indiquer `on` ou `off`")

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err,req) => {
            if(req.length < 1) return message.reply("Ce serveur n'est pas encore enregistré !")
            if(req[0].anti_link === choice) return message.channel.send({embeds : [EmbedStatut]})
            
            db.query(`UPDATE serveur SET anti_link = '${choice}' WHERE guildID = ${message.guildId}`)
            console.log(`[LOGS] && L'anti lien a été ${choice === "on" ? "activé" : "désactivé"} sur le serveur ${message.guild.name}`)

            message.reply({embeds : [Embed]})
        })
    }
})