const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDE0NjQ0MzY3NDc5Nzk5ODE4.DWqkgg.Z14YyJsJwx7a-ScoFEthdCR7YFQ"
const PREFIX = ".."

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    
     bot.login(TOKEN);
