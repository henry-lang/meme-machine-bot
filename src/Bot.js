const Discord = require('discord.js');
const Firebase = require('firebase');
const Config = require('./Config.json');
const IsImageUrl = require('is-image-url');

var bot = new Discord.Client();
var cmds = {
    add: {
        args: 2,
        usage: '_add <category> (Make sure an image is attached!)',
        func: function(message, args) {
            let url = args[0];
            let category = args[1];

            if(IsImageUrl(url)) {
                server.child(`${message.guild.id}/memes/${category}`).push({
                    url: url,
                    author: message.author.id
                })
            } else {
                message.channel.send(":x: The url you sent is not an image.");
            }
        }
    }
}

Firebase.initializeApp(Config.firebase);
var server = Firebase.database().ref('server');

bot.once('ready', function() {
    console.log('Bot ready!');
    bot.on('message', function(message) {
        if(!message.content.startsWith(Config.prefix) || message.author.bot) return;

        let cmd = message.content.split(' ')[0].substr(1).toLowerCase();
        let args = message.content.split(' ');
        args.shift();

        if(Object.keys(cmds).includes(cmd)) {
            if(args.length != cmds[cmd].args) {
                message.channel.send('Incorrect usage. Usage: ' + cmds[cmd].usage);
            } else {
                cmds[cmd].func(message, args);
            }
        } else {
            message.channel.send('Unknown command.');
        }
    });
});

// function addMeme(fileName, meme) {

// }

bot.login(Config.discord_token);
