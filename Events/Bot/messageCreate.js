const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const config = require("../../Config/owners.json")
const { Configuration, OpenAIApi } = require("openai")
module.exports = new Event("messageCreate", async (bot, message) => {
    if (message.author.bot) return
    const db = bot.db
   

    db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {

        if (req.length < 1) {
            let sql = `INSERT INTO serveur (guildID, prefix, raid, anti_link, premium, welcomeID, chatgptID, ticketID, transcriptID) VALUES (${message.guild.id}, "?", 'off', 'off', 'off', 'off', 'off', 'off', 'off')`
            db.query(sql, function (err) {
                if (err) throw err
            })
            return message.reply(`Votre serveur \`${message.guild.name}\` a été enregisté dans la base de données.`)
        }
        let prefix = req[0].prefix

        let messageArray = message.content.split(" ")
        let command = messageArray[0]
        let args = messageArray.slice(1)

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {
            
            
                if(req[0].anti_link === "on"){
                    if(config.owners.includes(message.author.id)) {
                        return console.log("Lien non supprimé car Owner.")
                    } else {
                        bot.function.anti_link(message)
                    }
                
                } else {
                    return
                }
        
           
        })


        if (message.channel.id === req[0].chatgptID) {
            const configuration = new Configuration({
                apiKey: "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",
            });
    
            const openai = new OpenAIApi(configuration);
            try {
                if (message.author.bot) return;
                await message.channel.sendTyping()
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: `${message.content}`,
                    temperature: 0.9,
                    max_tokens: 1000,
                });
    
                if (response.data.choices[0].text.trim() !== '') {
                    message.reply(`${response.data.choices[0].text}`);
                    console.log(`Question : ${message.content}`.bgCyan)
                    console.log(`Réponse : ${response.data.choices[0].text}`.bgYellow)
                }
                return;
            } catch (e) {
                console.log(e)
            }
        }

        let commandFile = bot.commands.get(command.slice(prefix.length))
        db.query(`SELECT * FROM user WHERE userID = ${message.author.id}`, async (err, req) => {

            if (req.length < 1) {
                let sql = `INSERT INTO user (userID, xp, level) VALUES (${message.author.id}, '100', '1')`
                db.query(sql, function (err) {
                    if (err) throw err
                })

            } else {

                if (!message.content.startsWith(prefix)) {

                    let xp = Math.floor(Math.random() * 36)
                    let need = (parseInt(req[0].level) + 1) * 1000

                    db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) + xp}' WHERE userID = ${message.author.id}`)

                    if (parseInt(req[0].xp) >= need) {
                        db.query(`UPDATE user SET level = '${parseInt(req[0].level) + 1}' WHERE userID = ${message.author.id}`)
                        db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)

                        message.channel.send(`Bravo ${message.author}, tu es passé niveau \`${parseInt(req[0].level) + 1}\`.`)
                    }

                    if (parseInt(req[0].xp) < 0) {
                        db.query(`UPDATE user SET level = '${parseInt(req[0].level) - 1}' WHERE userID = ${message.author.id}`)
                        db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)

                        message.channel.send(`Bravo ${message.author}, tu es redescendu niveau \`${parseInt(req[0].level) + 1}\`.`)
                    }
                }
            }
        })

        if (!message.content.startsWith(prefix)) return
        if (!commandFile) return message.reply("Cette commande n'existe pas.")
        if(!message.member.permissions.has(new Discord.Permissions(commandFile.permission))) return message.reply("Vous n'avez pas la permission requise pour exécuter la commande.")
        commandFile.run(bot, message, args, db)

    })


})