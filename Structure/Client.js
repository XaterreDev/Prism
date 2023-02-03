const Discord = require("discord.js")
const Command = require("./Command")
const SlashCommand = require("./SlashCommand")
const Database = require("./Database")
const intents = new Discord.Intents(32767)
const fs = require("fs")
require("colors")
class Client extends Discord.Client {
    constructor(){
        /**
         * @type {Discord.Collection <String, Command>}
         */

        super({intents})

        this.commands = new Discord.Collection()
        this.snipe = new Map(), 
        this.db = require("./Database")
        this.color = "#5865F2"    
        this.function = {
            anti_link : require("../Fonctions/searchLinks"), 
            createID : require("../Fonctions/createID")
        }
    }



    async start(token){

        fs.readdirSync("./Commandes").forEach(dirs => {
            fs.readdirSync(`./Commandes/${dirs}`).filter(f => f.endsWith(".js")).forEach(file => {

                /**
                 * @type {Command}
                 */

                const command = require(`../Commandes/${dirs}/${file}`)
                console.log(`🚀 Command ${file} chargée avec succès`.bgMagenta)
                this.commands.set(command.name, command)
            })
        })
        fs.readdirSync("./Events").forEach(async dirs => {
            fs.readdirSync(`./Events/${dirs}/`).filter(files => files.endsWith(".js")).forEach(async evt => {

                /**
                 * @type {Event}
                */

                const event = require(`../Events/${dirs}/${evt}`)
                console.log(`📁 ${event.event} Event chargé avec succès`.bgMagenta)
                this.on(event.event, event.run.bind(null, this))
            })
        })
        this.login(token)
    }
}
module.exports = Client;