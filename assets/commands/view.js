exports.run = (bot, message, args) => {
//COMMAND CURRENTLY BEING WORKED ON.

    //config
    const config = require('../config.json');
    if(message.author.id !== config.ownerID) return;

    const Discord = require("discord.js");

    //Database
    const mongoose = require('mongoose');
    mongoose.connect(config.testDatabase);
    const User = require("../../models/user.js");

    let userPoints = 0;
    
	if(args[0] === "users") {
        if (!args[1]){
            message.reply("Please specify a \`@<user>\` or choose \`all\`.")
        } else {
            if(args[1] === "all"){
                User.find({}, function(err, users){
                    users.forEach(function(user){
                        const viewEmbed = new Discord.RichEmbed()
                        .setAuthor(`${user.username}`)
                        .setColor(0x2f3136)
                        .setFooter(`${user.tag}`)
                        .addField(`Points (:cookie:):`, `${user.points}`)
                        .setTimestamp();
                        message.channel.send(viewEmbed)
                    });
                    })
                }
            }
        }
    }

exports.config = {
	
}