const config = require('./config.json');
const dogeify = require('dogeify-js');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("such Bot. much amaze");
});

client.on('message', async (msg) => {
  if (!msg.author.equals(client.user) && msg.mentions.has(client.user)) {
    msg.channel.send(await dogeify(msg.content));
  }
});

client.on("typingStart", async function(channel, user){
  await channel.send("wow many type. much wait").then(
    (msg) => 
    {
      setTimeout(() => msg.delete(), 2500);
    }  
  );
});


client.login(config.token);