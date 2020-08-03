const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const {prefix, token} = require('./config.json');

var memes = readData('./memes.json');

const cmds = {
    add: {
        args: 1,
        usage: '_add <url>',
        func: function(message, args) {
            
        }
    }
}

bot.once('ready', function() {
    console.log('Bot ready!');

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

function readData(fileName) {
    fs.readFile(fileName, function(err, data) {
        if (err) throw err;
        console.log(JSON.parse(data));
    });
}

function saveData(data, fileName) {
    fs.writeFile('./memes.json', JSON.stringify(memes), function(err) {
        if(err) throw err;
    });
}

bot.login(token);