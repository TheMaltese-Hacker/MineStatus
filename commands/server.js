const mcping = require('mc-ping-updated');
const Discord = require("discord.js");
const escape = require('markdown-escape');

exports.run = async (settings, client, message, args) => {
	//code to run when command is sent
	mcping(settings.ip, settings.port, function (err, res) {
                 if (err) {
                     console.log(err);
                     message.channel.send('Error getting server status.');
                     return;
                 } else {
                     console.log('RES:', res)
                     //console.log('players:', res.players)
                     //console.log('sample:', res.players.sample)

                     //console.log('DESC:', res.description)
                     //console.log('EXTRA:', res.description.extra)
                     try {
                         favicon = res.favicon.slice(22)
                         hasIcon = 'yes'
                     } catch (error) {
                         hasIcon = 'no'
                     }
                     let onlinePlayers = [];
                     if (typeof res.players.sample == 'undefined') {
                         serverStatus = '*No one is playing!*';
                     } else {
                         for (var i = 0; i < res.players.sample.length; i++) {
                             onlinePlayers.push(res.players.sample[i].name);
                         };
                         onlinePlayers = escape(onlinePlayers.sort().join(', ')).replace(/\u00A7[0-9A-FK-OR]|\\n/ig,'');
                         serverStatus = '**' + res.players.online + '/' + res.players.max +
                             '**' + ' player(s) online.\n\n' + onlinePlayers;

                         console.log('Server Status', serverStatus);
                     };
                     if (hasIcon === 'yes') {
                         const buffer = Buffer.from(favicon, 'base64')
                         const serverEmbedicon = new Discord.MessageEmbed()
                         .setThumbnail('https://images-ext-2.discordapp.net/external/4MT1SPSwfDkXpPKDv-rpxUCG0x3SDs-4Tk9RpNMZBtE/https/cdn.discordapp.com/icons/830454197479931914/c1bfabd443508daa4a93a64e26e82bf0.webp')
                          .setTitle('Status for ' +
                             settings.ip + ':')
                             
                             
                             .addField("Dynmap", "Use [This Link](http://lavablocksmp.ddns.net:8192)")

                             .setColor(embedColor)

                             .setDescription(
                             serverStatus)
                             
                             .addField(
                             "Server version:", res.version.name)
                             .addField("Command:", "use /server to trigger command :watermelon:")
                         message.channel.send(serverEmbedicon);
                     } else if (hasIcon === 'no') {
                         const serverEmbedNoIcon = new Discord.MessageEmbed().setTitle(
                                 'Status for ' + settings.ip + ':').setColor(embedColor)
                             .setDescription(serverStatus).addField("Server version:",
                                 res.version.name)
                            .addField("Use /server to trigger command :watermelon:")
                         message.channel.send(serverEmbedNoIcon);
                     }
                 }
             }, 3000);
             return;
}
