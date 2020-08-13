const Discord = require('discord.js');
const Firebase = require('firebase');
const Config = require('./Config.json');
const IsImageUrl = require('is-image-url');
const { syncBuiltinESMExports } = require('module');

var bot = new Discord.Client();
var cmds = {
    add: {
        args: 2,
        usage: '_add <url> <category>',
        func: function(message, args) {
            let url = args[0];
            let category = args[1];

            if(IsImageUrl(url)) {
                message.channel.send("Image is valid url.");
            } else {
                message.channel.send(":x: The url you sent is not an image.").then(function(msg){
                    msg.delete({timeout: 1000});
                });
                message.delete({timeout: 1000});
            }
            // memes.child(category).push({
            //     url: url,
            //     score: 0
            // });
        }
    }
}

Firebase.initializeApp(Config.firebase);
var memes = Firebase.database().ref('memes');

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
