exports.run = (bot, message, args) => {

    const config = require('../config.json');
    const Discord = require("discord.js");
    
// IF arguments aren't provided
    if(args[0] === undefined) {
        message.reply("You must provide a \`channel\` to lockdown or choose \`server\`.");
        return;
    } 

// IF a channel is provided and there is no time provided
    else if(message.mentions.channels.first() && args[1] === undefined) {
        message.mentions.channels.first().overwritePermissions(config.verifiedRole, {
            SEND_MESSAGES: false
        })
        .catch(console.error);
         //set the permissions for the mentioned channel (when the command is used)

        const lockdownEmbed = new Discord.RichEmbed()
  .setDescription(`**:lock: Channel ${args[0]} locked down.**`)
  .setColor(0xed122c)
  .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
  .setTimestamp();
  message.channel.send(lockdownEmbed);
  //send the embed
  console.log(message.mentions.channels.first() + ' Locked down');
    }

// If a channel is provided and a time is specified
    else if(message.mentions.channels.first() && args[1]) {
        let timeOut = args[1] * 60000;
        //take the input and multiply it by 60,000 to make it in minutes

        message.mentions.channels.first().overwritePermissions(config.verifiedRole, {
            SEND_MESSAGES: false
        })
        .catch(console.error);
        //set the permissions for the mentioned channel (when the command is used)

        const lockdownEmbed = new Discord.RichEmbed()
    .setDescription(`**:lock: Channel ${args[0]} locked down for ${args[1]} minutes.**`)
    .setColor(0xed122c)
    .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
    .setTimestamp();
    message.channel.send(lockdownEmbed);
    //send the embed
    console.log(message.mentions.channels.first() + ' Locked down');

    setTimeout(function(){
        message.mentions.channels.first().overwritePermissions(config.verifiedRole, {
            SEND_MESSAGES: true
        })
        .catch(console.error);

        const unlockEmbed = new Discord.RichEmbed()
    .setDescription(`**:unlock: Channel ${args[0]} unlocked**`)
    .setColor(0x2add1a)
    .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
    .setTimestamp();
    message.channel.send(unlockEmbed);
    }, timeOut);
    //the above function resets the "lockdown" (permissions) after the specified duration by the user.
    //timeOut is a variable formed from the duration specified when the command is used multiplied by 60,000 (setTimeout expects ms, not seconds/minutes/hours/days).
}

// If the lockdown is for the entire server.
    else if(args[0] === "server" && args[1] === undefined) {
        console.log("Server Lockdown Initiated")

        message.guild.channels.forEach(function(channel){
            //loop through each channel
            console.log(channel + ' Locked down');
                channel.overwritePermissions(config.verifiedRole, {
                    SEND_MESSAGES: false,
                })
                .catch(console.error)
                //disable permissions for each channel being looped
        });
        
        const serverLockdownEmbed = new Discord.RichEmbed()
  .setDescription(`**:x: Server locked down.**`)
  .setColor(0xed122c)
  .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
  .setTimestamp();
  message.channel.send(serverLockdownEmbed);
  //send the embed
    }

// If the lockdown is for the server and a time is specified
    else if(args[0] === "server" && args[1]) {
        let serverTimeOut = args[1] * 60000;
        console.log("Server Lockdown Initiated.")

        message.guild.channels.forEach(function(channel){
            //loop through each channel
            console.log(channel + ' Locked down');
                channel.overwritePermissions(config.verifiedRole, {
                    SEND_MESSAGES: false,
                })
                .catch(console.error)
                //disable permissions for each channel being looped
        });
        
        const serverLockdownEmbed = new Discord.RichEmbed()
  .setDescription(`**:lock: Server locked down for ${args[1]} minutes.**`)
  .setColor(0xed122c)
  .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
  .setTimestamp();

  message.channel.send(serverLockdownEmbed);

  setTimeout(function(){
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
  }, serverTimeOut)
    }
    
}
//TODO: FIX THIS MONSTROSITY, ESPECIALLY THE LAST SET OF CONDITIONALS
exports.config = {
	
}