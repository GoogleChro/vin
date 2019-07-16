const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(message.author.id != '437578122100211713') return message.channel.send("Sorry but your not a admin");
    let reembed = new Discord.RichEmbed()
    .setDescription("I\'m restarting my client I'll be back soon")
    .setColor("#FF0000")
    message.channel.send(reembed).then(() => {
    process.exit(2);
   });
};

module.exports.config = {
  aliases: []
}

module.exports.help = {
        name: 'restart'
};        
