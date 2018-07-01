exports.run = (bot, message, args) => {
    if(message.author.id !== config.ownerID) return;
    
    const config = require('../config.json');
    const Discord = require("discord.js");

//IF no arguments are provided
	if(args[0] === undefined) {
        message.reply("You must provide a \`channel\` to lockdown or choose \`server\`.");
    }

//IF a channel is provided.
    if(message.mentions.channels.first()) {
        message.mentions.channels.first().overwritePermissions(config.verifiedRole, {
            SEND_MESSAGES: true
        })
        .catch(console.error);
         //set the permissions for the mentioned channel (when the command is used)

        
        const lockdownEmbed = new Discord.RichEmbed()
  .setDescription(`**:unlock: Channel ${args[0]} unlocked.**`)
  .setColor(0x2add1a)
  .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
  .setTimestamp();
  message.channel.send(lockdownEmbed);
  //send the embed
  console.log(message.mentions.channels.first() + ' Unlocked');
    }

// IF the unlock is for the server
    if(args[0] === "server"){
        message.guild.channels.forEach(function(channel){
            //loop through each channel
            console.log(channel + ' Unlocked');
                channel.overwritePermissions(config.verifiedRole, {
                    SEND_MESSAGES: true,
                })
                .catch(console.error)
                //enable permissions for each channel being looped
    
            let memberNoSpeakChannels = Object.values(config.memberNoSpeakChannels);
            //hacky. Have to do this because the array inside the config is presented as an object instead of an array.
            //Object.values() takes the values from an object and places them into an array.
            memberNoSpeakChannels.forEach(function(c){
                if(channel.id === c){
                    channel.overwritePermissions(config.verifiedRole, {
                        SEND_MESSAGES: false,
                    })
                    .catch(console.error)
                console.log(`Prevented chatting for channel: ${channel.id}`)
                }
        })
            //welcome to callback hell
        });
    
        const serverUnlockEmbed = new Discord.RichEmbed()
      .setDescription(`**:unlock: Server unlocked.**`)
      .setColor(0x2add1a)
      .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
      .setTimestamp();
    
      message.channel.send(serverUnlockEmbed);
    }
}

exports.config = {
	
}