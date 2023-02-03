const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = {

    name: "renew",
    description: "Recrée un channel avec les mêmes permissions",
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    category: "Modération",
    use: "renew",

    async run(bot, message) {

        message.channel.clone().then(msg => msg.send(`Le channel à été recrée par ${message.author}`))
        message.channel.delete()
    }
}