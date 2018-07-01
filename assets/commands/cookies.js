exports.run = (bot, message, args) => {
	//config
    const config = require('../config.json');
    const Discord = require("discord.js");

    //Database
    const mongoose = require('mongoose');
    mongoose.connect(config.testDatabase);
    const User = require("../../models/user.js");

    if(message.mentions.members.first()) { //to view the points for someone who is @mentioned by the user using the command.
        User.findOne({userID: message.mentions.members.first().id}, function(err, user){
            if(err){
                console.err(err);
            } else if(!user){
                message.reply("That user does not exist or has no entry in the database!");
            }            
            else if (user){
                const pointsEmbed = new Discord.RichEmbed()
                .setTitle(`Cookies | ${message.mentions.members.first().displayName}`)
                .setDescription(`❯ **${message.mentions.members.first().user.tag}** has ${user.points} :cookie:s`)
                .setColor(0x2add1a)
                .setTimestamp();
                message.channel.send(pointsEmbed);
            }
        });

    } else if(args[0] === "leaderboard") {
        User.find({}, function(err, users){
            if(err){
                console.err(err);
            } else {
                let top = [];
                let topScore = 0;
                forEach(function(user){
                    if(user.points > topScore) {
                        if(top.length > 5) { //hmmm...
                            return;
                        } else {
                        top.push(user);
                        }
                        
                    }
                
                const pointsEmbed = new Discord.RichEmbed()
                .setTitle(`Cookies | ${message.author.username}`)
                .setDescription(`**${message.author.tag}**, you have ${user.points} :cookie:s`)
                .setColor(0x2add1a)
                .setTimestamp();
                message.channel.send(pointsEmbed);
            }
        });

    } else if(!message.mentions.members.first()){
        User.findOne({userID: message.author.id}, function(err, user){
            if(err){
                console.err(err);
            } else {
                const pointsEmbed = new Discord.RichEmbed()
                .setTitle(`Cookies | ${message.author.username}`)
                .setDescription(`**${message.author.tag}**, you have ${user.points} :cookie:s`)
                .setColor(0x2add1a)
                .setTimestamp();
                message.channel.send(pointsEmbed);
            }
        });
    }

    
}

exports.config = {
	
}