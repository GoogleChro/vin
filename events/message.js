const active = new Map();
module.exports = async (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;
  const config = require("../botconfig")
  const Discord = require ("discord.js")
  const db = require('quick.db');
  const fs = require('fs')
  const prefixes = new db.table('PREFIXES');
  const logchannels = db.table("LOGCHANNEL");
 
  // This comes in your message event

const swearWords = ['shit', 'fuck', 'retard','nigger','cunt', 'whore', 'fag', 'faggot', 'dick', 'cock', 'pussy', 'slut', 'bastard', 'fuck you']
  if (config.swearfilter == true) {
    if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
      message.delete().catch(O_o => {});

      let embed = new Discord.RichEmbed()
        .setTitle('Swear Word Detected')
        .setColor("RED")
        .setDescription(`${message.author}, you can't say that. Keep saying that you'll be warned`);
      message.channel.send(embed).then(message => message.delete(10000));
      return;
    }
  };
  
  // Bot Mention Embed
  if(message.content.toLowerCase() === '<@591642154896588840>'){
    let embed = new Discord.RichEmbed()
    .setDescription(`Hey I'm ${client.user.username} your bot that can play music.\n I'm always being improved by my bot owner Vin イーブン#8031\n If there's any problems join my server\n https://discord.gg/hukRX5Z`)
    .setThumbnail(client.user.displayAvatarURL)
    .setColor(0xFF0000);
    message.channel.send(embed);
  };
  
  client.user.setStatus("dnd")
  
  var prefix = await prefixes.fetch(`${message.guild.id}`);
  if(!prefix) {
    prefixes.set(`${message.guild.id}`, ">");
    prefix = '.'
  }
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
 
  let ops = {
    active: active
  };
  
  
   // Our standard argument/command name definition.
    // Our standard argument/command name definition.
   let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    cmd.run(client, message, args, ops);
  }
};
