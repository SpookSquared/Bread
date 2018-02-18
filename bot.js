const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDE0NjQ0MzY3NDc5Nzk5ODE4.DWqkgg.Z14YyJsJwx7a-ScoFEthdCR7YFQ"
const PREFIX = ".."

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
});
}

var fourtunes = [
    "Yes",
    "Maybe",
    "Think again",
    "No",
    "Of course!"
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

        if (!message.content.startsWith(PREFIX)) return;

        var args = message.content.substring(PREFIX.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "ping":
            message.channel.send("Pong!");
            break;
            case "info":
            message.channel.send("This bot is cooler than sliced bread");
            break;
            case "8ball":
            if (args[1]) message.channel.send(fourtunes[Math.floor(Math.random() * fourtunes.length)]);
            else message.channel.send("Can't read that");
                break;
                case "embed":
                var embed = new Discord.RichEmbed()
                .setDescription("Hello, this is an awesome piece of text")
                .setColor(0x551A8B)
                message.channel.sendEmbed(embed);
                break;
                case "noticeme":
                message.channel.send(message.author.toString() + " What do you want?")
                break;
                case "play":
                if (!args[1]) {
                    message.channel.send("Please provide a link");
                    return;
                }
                if (!message.member.voiceChannel) {
                    message.channel.send("You must join the voice channel first");
                    return;
                }
                if (!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                };
            
                var server = servers[message.guild.id];

                server.queue.push(args[1]);

                if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
});
                break;
                case "skip":
                var server = servers[message.guild.id];
                if (server.dispatcher) server.dispatcher.end();
                break;
                case "stop":
                var server = servers[message.guild.id];

                if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                break;
            default:
            message.channel.send("Invalid command");
            }
    });

  bot.login(TOKEN);
