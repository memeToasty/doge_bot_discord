const config = require('./config.json');

const dogeify = require('dogeify-js');
const Discord = require('discord.js');
const { prototype } = require('dogeify-js/src/dogeify');
const client = new Discord.Client();
const fetch = require('node-fetch');

const url =  "https://api.coingecko.com/api/v3/simple/price?ids=Dogecoin&vs_currencies=eur";

function removeMessageAfter (msg, time) {
  if (!(msg.channel instanceof Discord.DMChannel)) {
    setTimeout(() => msg.delete(), time);
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("such Bot. much amaze");
});

client.on('message', async (msg) => {
  if (!msg.author.equals(client.user) && msg.mentions.has(client.user)) {
    var args = msg.content.split(' ');
    
    const mention = "@Doge ";
    const cmd = args[1];
    const arg = msg.cleanContent.substring(mention.concat(cmd + ' ').length).trim();
    if (cmd == 'dogeify') {
      msg.channel.send(await dogeify(arg));
      removeMessageAfter(msg, 0);
    } else if (cmd == 'pet') {

      msg.channel.send('', {files: [
        'images/themks.png'
      ]}).then((msg) => {
        removeMessageAfter(msg, config.petStatusRemoveTime);
      });
      removeMessageAfter(msg, config.petStatusRemoveTime);
    } else if (cmd == 'price') {
      fetch(url).then(res => res.json()).then((json) => {
        msg.channel.send('many price: ' + json.dogecoin.eur + '€');
      });
    } else if (cmd == 'tip') {
      msg.channel.send('hodl');
    }
  }
});

client.on("typingStart", async function(channel, user){
  await channel.send("wow many type. much wait").then(
    (msg) => 
    {
      removeMessageAfter(msg, config.typeStatusRemoveTime);
    }  
  );
});


client.login(config.token);