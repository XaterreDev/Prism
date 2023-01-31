const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const moment = require ("moment");


module.exports = new Command({
    name: "userinfo", 
    description: "Permet d'avoir les informations d'un utilisateur", 
    permissions: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category : "Utilisateurs", 
    use : "userinfo (membre)", 
    async run(bot, message, args, db){
        let user; 
        if(message.user ? args._hoistedOptions.length > 0 : args.length > 0) {
            user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
            if(!user) message.reply("Aucun user trouvé.")
        } else user = message.user ? message.user : message.author
        let member = message.guild.members.cache.get(user.id)
		const userFlags =  member.user.flags.toArray()
		const flags =  {
			DISCORD_EMPLOYEE: '<:discord_staff:1070018986059780216>',
			DISCORD_PARTNER: '<:partner:1031465302665461791>',
			BUGHUNTER_LEVEL_1: '<:bughunter_lv1:1070019163986341968>',
			BUGHUNTER_LEVEL_2: '<:bughunterlv2:1070019240687587409>',
			HYPESQUAD_EVENTS: '<:hypesquad_event:1070019331808821349>',
			HOUSE_BRAVERY: '<:bravery:1070019399190331423>',
			HOUSE_BRILLIANCE: '<:brillance:1070019451203899423>',
			HOUSE_BALANCE: '<:balance:1070019522637078620>',
			EARLY_SUPPORTER: '<:early_supporter:1070019590572228689>',
			TEAM_USER: 'Team User',
			SYSTEM: 'System',
			VERIFIED_BOT: '<:verified_bot:1070019672306634822>',
			EARLY_VERIFIED_BOT_DEVELOPER: '<:early_bot_developer:1070019773460647936>',
            ACTIVE_DEVELOPER : "<:active_developer:1070020758992060599>"
		};
        message.reply({
            embeds: [{
                color: bot.color,
                fields: [{
                    name: `Informations sur le compte ・ 👤`,
                value: `\n<:angle:1061407457383022722>    **Pseudo :** ${user} (${user.tag}) \n <:angle:1061407457383022722>    **Identifiant :** ${member.user.id} \n <:angle:1061407457383022722>    **Création du compte :** <t:${parseInt(user.createdAt / 1000)}:f>\n <:angle:1061407457383022722>    **Robot :** ${member.user.bot ? "<a:yes:1070020390673469461> " : "<a:no:1070020319743578152>"}\n <:angle:1061407457383022722>    **Badges :**  ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' | ') : '\`Aucun Badges\`'}\n \n <:angle:1061407457383022722>    **Photo de profil : ** [Télécharger](${user.displayAvatarURL({dynamic:true})}) \n <:angle:1061407457383022722> **Bannière** : [Télécharger](${await (await bot.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096})})`
                }],
                thumbnail: { url: member.user.displayAvatarURL({ dynamic: true })},
                image: {url : await (await bot.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096})}
            }]
        });
    }
})