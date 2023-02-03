const Event = require("../../Structure/Event")
const Discord = require("discord.js")

module.exports = new Event("interactionCreate", async (bot, interaction) => {
    const db = bot.db

    db.query(`SELECT * FROM serveur WHERE guildID = ${interaction.guild.id}`, async (err, req) => {
        if (interaction.isButton()) {
            if (interaction.customId === "ping") {

                let reloadPing = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId("ping")
                            .setEmoji("🔄")
                            .setLabel("Actualiser")
                            .setStyle("PRIMARY")
                    )
                const endTimeDB = Date.now()

                const startTime = Date.now()
                const pingUser = startTime - endTimeDB;
                let emojiUser;
                if (pingUser < 200) { emojiUser = "🟢" }
                else if (pingUser < 400 && pingUser > 200) { emojiUser = "🟠" }
                else if (pingUser > 400) { emojiUser = "🔴" };
                // Ping de l'API de discord
                const APIPing = bot.ws.ping;
                let APIemoji;
                if (APIPing < 200) { APIemoji = "🟢" }
                else if (APIPing < 400 && APIPing > 200) { APIemoji = "🟠" }
                else if (APIPing > 400) { APIemoji = "🔴" }

                let PingEmbed = new Discord.MessageEmbed()
                    .setDescription(`
                    \`${emojiUser}\` Pong ! | Votre ping : **${pingUser}ms**
                    \`${APIemoji}\` Pong ! | API Discord ping : **${APIPing}ms**`)
                    .setFooter({ text: bot.user.username + ` ©️ Prism Bots`, iconURL: bot.user.avatarURL({ dynamic: true }) })
                    .setColor(bot.color)

                await interaction.deferUpdate()
                await interaction.editReply({ embeds: [PingEmbed], components: [reloadPing] })
            }
            if (interaction.customId === "accept_reglement") {
                interaction.member.roles.add("1067105247572541481")
                interaction.reply({ content: `> Vous avez accepté le règlement ! Bienvenue sur \`${interaction.guild.name}\`!`, ephemeral: true })
                let LogsRules = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                    .setDescription(`${interaction.user.username} a accepté le règlement !`)
                    .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.avatarURL({ dynamic: true }) })
                await bot.channels.cache.get("1067164537398235186").send({ embeds: [LogsRules] })
            }
            if (interaction.customId === "ticket") {
                if (!req[0].ticketID) {
                    interaction.reply("Vous n'avez pas configurer les tickets.")
                }
                if (!req[0].transcriptID) {
                    interaction.reply("Vous n'avez pas configurer le channel de transcript.")
                }
                else if (req[0].ticketID && req[0].transcriptID) {
                    let ID = bot.function.createTicketID("ticket")

                    let channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, { type: "GUILD_TEXT" })

                    await channel.setParent(req[0].ticketID)

                    await channel.permissionOverwrites.create(interaction.user, {
                        SEND_MESSAGES: true,
                        EMBED_LINKS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    })
                    await channel.permissionOverwrites.create(interaction.guild.id, {
                        VIEW_CHANNEL: false
                    })


                    await interaction.reply({ content: `Votre ticket a été créé avec succès ${channel} !`, ephemeral: true })

                    let Embed = new Discord.MessageEmbed()
                        .setColor(bot.color)
                        .setTitle("Ticket créé")
                        .setDescription(`${interaction.user.tag} a crée ce ticket. ID du Ticket \`${ID}\``)
                        .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                        .setTimestamp()
                        .setFooter({ text: `${bot.user.tag}`, iconURL: bot.user.avatarURL({ dynamic: true }) })

                    const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                        .setStyle("DANGER")
                        .setEmoji("1066445582194974791")
                        .setLabel("Fermer le Ticket")
                        .setCustomId("close"),
                        new Discord.MessageButton()
                            .setStyle("PRIMARY")
                            .setEmoji("1066456145545400371")
                            .setLabel("Demander le transcript")
                            .setCustomId("transcript"),
                    )

                    await channel.send({ embeds: [Embed], components: [btn] })
                }



            }
            if (interaction.customId === "transcript") {
                await interaction.deferReply()
                let Embed = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setTitle(`Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`)
                    .setDescription(`Ce transcript a été demandé dans le ticket : ${interaction.channel}`)
                    .setThumbnail(`${interaction.user.avatarURL({ dynamic: true })}`)
                    .setTimestamp()
                    .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.avatarURL({ dynamic: true }) })

                let EmbedSuccess = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setTitle(`Transcript envoyé avec succès !`)
                    .setThumbnail(`${interaction.user.avatarURL({ dynamic: true })}`)
                    .setTimestamp()
                    .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.avatarURL({ dynamic: true }) })

                await bot.channels.cache.get(req[0].transcriptID).send({ embeds: [Embed], files: [await transcript.createTranscript(interaction.channel)] })
                await interaction.editReply({ embeds: [EmbedSuccess], ephemeral: true })
            }
            if (interaction.customId === "close") {
                let user = interaction.guild.members.cache.find(m => m.user.username === interaction.message.embeds[0].description.split(" ")[0].split("#")[0] && m.user.discriminator === interaction.message.embeds[0].description.split(" ")[0].split("#")[1]).user
                try { await user.send(`Votre ticket a été supprimé par ${interaction.user.tag}`) } catch (err) { }
                await interaction.channel.delete()
            }
        }
    })
    if (interaction.isCommand()) {
        const command = bot.commands.get(interaction.commandName);
        command.run(bot, interaction, interaction.options, bot.db)
    }


})