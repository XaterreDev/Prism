const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = {
    name: "ping",
    description: "Affice la latence du bot et de l'API",
    category: "Utilisateurs",
    use: "ping",

    async run(bot, message) {
        let reloadPing = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId("ping")
                .setEmoji("🔄")
                .setLabel("Actualiser")
                .setStyle("PRIMARY")
        )
    // Ping du membre qui requête la commande
    const endTimeDB = Date.now()

    const startTime = Date.now()
    const pingUser = startTime - endTimeDB;
    let emojiUser;
    if(pingUser <= 200) { emojiUser = "🟢" } 
    else if (pingUser <= 400 && pingUser >= 200) { emojiUser = "🟠" }
    else if(pingUser >= 400) {emojiUser = "🔴" };
    // Ping de l'API de discord
    const APIPing = bot.ws.ping;
    let APIemoji;
    if(APIPing <= 200) { APIemoji = "🟢" }
    else if(APIPing <= 400 && APIPing >= 200) { APIemoji = "🟠" }
    else if(APIPing >= 400) {APIemoji = "🔴" }

    let PingEmbed = new Discord.MessageEmbed()
        .setDescription(`
        \`${emojiUser}\` Pong ! | Votre ping : **${pingUser}ms**
        \`${APIemoji}\` Pong ! | API Discord ping : **${APIPing}ms**`)
        .setColor(bot.color)
        .setFooter({text : bot.user.username + ` ©️ Prism Bots`, iconURL : bot.user.avatarURL({dynamic : true})})

    await message.reply({embeds: [PingEmbed], components: [reloadPing], ephemeral: true})
    }
}; 