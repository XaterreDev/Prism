const Event = require("../../Structure/Event")
const Discord = require("discord.js")

module.exports =  new Event("voiceStateUpdate", async (bot, oldState, newState) => {
    let oldChannel = oldState.channel;
    let newChannel = newState.channel;
    const EmojiVocal = ["🎷", "🚀", "🎴", "🧩", "🌺", "🌴", "👑", "🌸", "🥀", "👀"]
    const RandEmojiVocal = EmojiVocal[Math.floor(Math.random() * EmojiVocal.length)]

    let user = newState.guild.members.cache.get(newState.id).user || oldState.guild.members.cache.get(oldState.id).user;
                          /**le salon du crée ta vocal */
    if (newChannel?.id === "1070800696330420276") {
        let channel = await newChannel.guild.channels.create(` 〔${RandEmojiVocal}〕 #${user.username}`,{type: "GUILD_VOICE" });
        await channel.setParent(newChannel.parentId);
        newState.guild.members.cache.get(newState.id).voice.setChannel(channel);
    }                                  /**le salon du crée ta vocal */
    if (oldChannel?.parentId === "1070801667374727218" && oldChannel?.id !== "1070800696330420276") {
        if (oldChannel.members.size <= 0) await oldChannel.delete();
    }
})