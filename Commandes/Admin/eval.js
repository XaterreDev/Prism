const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({
    name : "eval",
    description : "Permet d'évaluer du code en passant par discord", 
    permission : Discord.Permissions.FLAGS.ADMINISTRATOR, 
    category : "Admin",
    use: "eval [code]", 
    async run(bot, message, args,db){
        if(!message.author.id === "1057616889603440690") {
            message.reply("> Vous n'avez pas le droit d'exécuter cette commande")
        } else if (!message.author.id === "662306628577787925"){
            message.reply("> Vous n'avez pas le droit d'exécuter cette commande")
        } else {
            const content = args.join(" ")
            const result = new Promise((resolve, reject) => resolve(eval(content)))

            return result.then((output) => {
                if( typeof output !== "string"){
                    output = require("util").inspect(output, {
                        depth: 0
                    })
                }

                let Embed = new Discord.MessageEmbed()
                .setTitle("Eval Command")
                .setDescription(`
**Output :**
\`\`\`js
${output}
\`\`\`      `) 
                .setColor(bot.color)
                .setFooter({text : bot.user.username + ` ©️ Prism Bots`, iconURL : bot.user.avatarURL({dynamic : true})})
                message.reply({embeds : [Embed]})
            }).catch((err) => {
                err = err.toString()
                let EmbedErr = new Discord.MessageEmbed()
                .setTitle("Eval Command")
                .setDescription(`
**Output :**
\`\`\`json
${err}
\`\`\`      `) 
                message.reply({embeds : [EmbedErr]})
            })

            
        }
    }
})