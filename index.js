//libs
var fs = require('fs');
var Discord = require("discord.js");
var bot = new Discord.Client();

//auth... see authExample.json
var auth = require("./auth.json")

//stash
var stash = require("./stash.json")

console.log('starting up...')
bot.login(auth.token);

bot.on('ready', function() {
    console.log(`Logged in as ${bot.user.tag}!`);
});

//status reports
bot.on('message', function(msg) {
    if (msg.content === '!help') {
        msg.reply(`\n\nComandos disponiveis: !status_PrimeiroNome\n\nComandos de Adição:   +XP_PrimeiroNome **QTD**  \n\nComando Subtração:   -XP_PrimeiroNome **QTD**`)
    }

    if (msg.content === '!status_Gohdar') {
        msg.reply(`Experiência:\n**${stash.XP_Gohdar} XP**`)
    }

});


//modifiers + or -
bot.on('message', function(msg) {
    if (msg.content[0] === '+' || msg.content[0] === '-') {
        var parseMsg = msg.content.split(' ')
        var command = parseMsg[0]
        var modifier = parseMsg[1]

        if (command === '+XP_Gohdar') {
            var amt = parseInt(modifier)
            stash.XP_Gohdar += amt
            fs.writeFileSync('stash.json', JSON.stringify(stash, null, 2));
            msg.reply(`Adicionou **${parseMsg[1]}** XP!\nSeu Total atual é: **${stash.XP_Gohdar}** de XP`)

        }

        if (command === '-XP_Gohdar') {
            var amt = parseInt(modifier)
            stash.XP_Gohdar -= amt
            fs.writeFileSync('stash.json', JSON.stringify(stash, null, 2));
            msg.reply(`Subtraiu **${parseMsg[1]}** de XP!\nSeu Total atual é: **${stash.XP_Gohdar}** XP`)


        }

    }
});