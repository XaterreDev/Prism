const Discord = require("discord.js")
const config = require("../Config/config")
module.exports = async (message) => {
    
    if(message.content.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g))){
            await message.delete()
            let Embed = new Discord.MessageEmbed()
            
            .setColor("RED")
            .setTitle(`Module Anti Link`)
            .setDescription(`${message.author} les liens sont interdis sur le serveur.`)
            .setFooter({text : `${message.author.username}`, iconURL : `${message.author.avatarURL({dynamic : true})}`})
    
    
            try{
                message.channel.send({embeds : [Embed]}).then(msg => {
                    setTimeout(() => {
                        msg.delete() 
                    }, 4000);
                })
            }catch (err){}
    }else if (message.content.match(/(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g)){
        await message.delete()
        let Embed = new Discord.MessageEmbed()
        
        .setColor("RED")
        .setTitle(`Module Anti Link`)
        .setDescription(`${message.author} les liens sont interdis sur le serveur.`)
        .setFooter({text : `${message.author.username}`, iconURL : `${message.author.avatarURL({dynamic : true})}`})


        try{
            message.channel.send({embeds : [Embed]}).then(msg => {
                setTimeout(() => {
                    msg.delete() 
                }, 4000);
            })
        }catch (err){}
    }

}