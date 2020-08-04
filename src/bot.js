const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const {discord_token, token} = require('./config.json');

var memes = require('./memes.json');
var len = Object.keys(memes).length;

const cmds = {
    add: {
        args: 1,
        usage: '_add <url>',
        func: function(message, args) {
            let meme = {
                user: message.author.id,
                data: args[0]
            }

            memes[len] = meme;
            len++;

            fs.writeFile('./memes.json', JSON.stringify(memes), function(err) {
                if(err) throw err;
            });
        }
    }
}

bot.once('ready', function() {
    console.log('Bot ready!');
    console.log(memes);
    bot.on('message', function(message) {
        if(message.content.startsWith(prefix)) {
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
        }
    });
});

// function addMeme(fileName, meme) {

// }

bot.login(token);