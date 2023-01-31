const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require("@discordjs/builders")
const { Routes } = require('discord-api-types/v10')
require("colors")

module.exports = async bot => {

    let commands = [
        new SlashCommandBuilder()
        .setName("pic")
        .setDescription("Permet d'avoir la photo de profil d'un utilisateur")
        .addUserOption(option => option.setName("member").setDescription("L'utilisateur que vous souhaitez")), 
        new SlashCommandBuilder()
        .setName("credits")
        .setDescription("Permet de voir mes credits."),
        new SlashCommandBuilder()
        .setName("chatgpt")
        .setDescription("Permet de choisir le salon dans lequel vous allez pouvoir parler a ChatGPT")
        .addChannelOption(options => options.setName("channel").setDescription("Le channel").setRequired(true)),
        new SlashCommandBuilder() 
        .setName("serverinfo")
        .setDescription("Permet de connaître les informations du serveur."),
        new SlashCommandBuilder() 
        .setName("userinfo")
        .setDescription("Permet de connaître les informations d'un utilisateur.")
        .addUserOption(options => options.setName("user").setDescription("L'utilisateur que vous voulez savoir les informations")),
    ];
    commands.push.toString(commands)
    
    const rest = new REST({version: '10'}).setToken("MTA2OTk3ODA2ODU3NzQxOTI3NQ.GAxEBw.tOvdqZRQQOcSSqJkKYFxDUMQIlcfzxj-oAdwu8");

    await rest.put(Routes.applicationCommands(bot.user.id), {body: commands});
    console.log("Les slashs commandes sont créées avecsuccès !".bgYellow);
}; 