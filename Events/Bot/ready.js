const Event = require("../../Structure/Event")
const SlashCommand = require("../../Structure/SlashCommand")
module.exports = new Event("ready", async bot => {
    SlashCommand(bot)
 
    console.log(`${bot.user.username} : En ligne sur ${bot.guilds.cache.size} serveur(s) || ${bot.users.cache.size} utilisateurs.`.bgWhite)
    setInterval(async () => {
        const acti = [`${bot.users.cache.size} users`, `${bot.guilds.cache.size} serveurs`]
        const randomActi = acti[Math.floor(Math.random() * acti.length)]
        bot.user.setActivity(randomActi, { type: "STREAMING", url: "https://twitch.tv/404" })

        console.log(`Le bot à changé de statut pour ${randomActi}`.bgRed)
    }, 4000);
})
