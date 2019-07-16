const Discord = require("discord.js");

const { promisify } = require("util");

const readdir = promisify(require("fs").readdir);

const Enmap = require("enmap");

const fs = require("fs");

const express = require('express')

const app = express();





// https://documentcloud.adobe.com/link/track?uri=urn%3Aaaid%3Ascds%3AUS%3Ae093e833-3707-4d53-979b-3642bb2d1496



const client = new Discord.Client()

client.commands = new Discord.Collection();

client.aliases = new Discord.Collection();

const botconfig = require("./botconfig.json");

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!

client.config = botconfig;

client.queue = new Map()



//basic command handler

fs.readdir("./commands/", (err, files) => {

   if(err) console.log(err);

   let jsfile = files.filter(f => f.split(".").pop() === "js")

   if(jsfile.length <= 0){

     console.log("Couldn't find commands.");

   return; 

  }

  

    jsfile.forEach((f, i) =>{

      let props = require(`./commands/${f}`); console.log(`${f} loaded!`);

      client.commands.set(props.help.name, props);

      props.config.aliases.forEach(alias => {

        client.aliases.set(alias, props.help.name);

    });

  });

});





fs.readdir("./events/", (err, files) => {

  if (err) return console.error(err);

  files.forEach(file => {

    const event = require(`./events/${file}`);

    let eventName = file.split(".")[0];

    client.on(eventName, event.bind(null, client));

  });

});

    

client.on('messageUpdate', (oldmessage, newmessage) => {})



client.on('ready', () => {

console.log('Melody is online');

client.user.setStatus("dnd");

setInterval(() => {

const activities = [(`YouTube Music`), (`My prefix is >`), (`${client.users.size} users`)];

const activity = activities[Math.floor(Math.random() * activities.length)];

client.user.setActivity((activity), { type: 'WATCHING' });

}, 10000);

client.channels.get('592062457992708115').send(`I'm ready to serve my servers`)

});



// This keeps the bot running 24/7



require('dotenv').config();

const token = process.env.TOKEN;

client.login(token);



app.get('/', function(req, res) {

res.sendStatus(200);

});



var http = require('http');

var util = require('util');

var commands = {};



app.listen(3000)
