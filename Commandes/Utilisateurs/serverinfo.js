const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const moment = require ("moment");


module.exports = new Command({
    name: "serverinfo", 
    description: "Permet d'avoir les informations du serveur", 
    permissions: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category : "Utilisateurs", 
    use : "serverinfo", 
    async run(bot, message, args, db){
        let user; 
        if(message.user ? args._hoistedOptions.length > 0 : args.length > 0) {
            user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
            if(!user) message.reply("Aucun user trouvé.")
        } else user = message.user ? message.user : message.author
        let member = message.guild.members.cache.get(user.id)

        let boost = message ? message.guild ? message.guild.premiumTier : "Pas de boost" : "Aucun boost"
        if(boost === "TIER_1") boost = "<:tier_1:1070029337211977798>";
        else if(boost === "TIER_2") boost = "<:tier_2:1070029388432810044>";
        else if(boost === "TIER_3") boost = "<:tier_3:1070029428366774324>";
        else if(boost === "NONE") boost = ":x:"

        message.reply({
            embeds: [{
                color: bot.color,
                fields: [{
                    name: "Informations sur le Serveur ",
                    value: `<:name:1070030217399255111>   **Nom :** \`${message.guild.name}\`  ${message.guild.id}\n <:couronne:1070056765619707925>   **Couronne :** <@${message.guild.ownerId}> (${message.guild.ownerId})\n <:add:1070057345780023376>   **Création :** <t:${parseInt(message.guild.createdTimestamp / 1000)}:f>\n <:star:1031471483102449705>  **Description :** ${message.guild.description ? message.guild.description : "<a:no:1070020319743578152>"}\n  <a:boost:1070057764681953331>  **Boost :** \`${message.guild.premiumSubscriptionCount}\` (${boost})\n <:discord_staff:1070018986059780216> **Modération :** \`${message.guild.verificationLevel}\`\n   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁   \n \n <:users:1070058460986753095>  **Membres :** \`${message.guild.memberCount}/${message.guild.maximumMembers}\`\n <:discord_partners:1070019073708150804>   **Partenaire :** ${message.guild.partnered ? "<a:yes:1070020390673469461>" : "<a:no:1070020319743578152>"}\n <:certification:1070058757985411102>  **Vérification :** ${message.guild.verified ? "<a:yes:1070020390673469461>" : "<a:no:1070020319743578152>"}\n <:link:1070059577267212329>  **URL :** ${message.guild.vanityURLCode ? "<a:yes:1070020390673469461>" : "<a:no:1070020319743578152>"} (.gg/${message.guild.vanityURLCode ? message.guild.vanityURLCode : ``}) \n  <:nsfw:1070059917404282990> **NSFW :** \`${message.guild.nsfwLevel}\``
                }, { 
                    name: "Autres informations sur le Serveur",
                    value: ` <:rules:1070060016259834046> **Règlement :** ${message.guild.rulesChannel ? message.guild.rulesChannel : "<a:no:1070020319743578152>"}\n <:secure:1070060340022366238> **A2F :** ${message.guild.mfaLevel? "<a:yes:1070020390673469461>" : "<a:no:1070020319743578152>"}\n <:map:1031474290631131136>  **Langue :** \`${message.guild.preferredLocale}\``
                }],
                thumbnail: { url: message.guild.iconURL({ dynamic: true }) },
                image: { url: message.guild.bannerURL({dynamic: true, size: 4096}) },
                footer: ({text : bot.user.username + ` ©️ Prism Bots`, iconURL : bot.user.avatarURL({dynamic : true})})       
            }]
        });
    }
})