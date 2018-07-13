exports.run = (bot, message, args) => {
	//config
    const config = require('../config.json');
    const Discord = require("discord.js");

    //Database
    const mongoose = require('mongoose');
    mongoose.connect(config.testDatabase);
    const User = require("../../models/user.js");

    if(!message.member.roles.has(config.moderatorRoleID)) return; //if the member isn't a moderator, return.

    if(!message.mentions.users.first()){
        return message.reply("Error: you must specify a @user!")
    } else {
        const userPunished = message.mentions.users.first();
    }

    User.findOne({userID: userPunished.id}, function(err, user){
            if(err){
                console.err(err);
            } else if(!user){
                message.reply("That user does not exist or has no entry in the database!");
            }            
            else if (user){
                if(user.punishLevel) {
                    User.findOneAndUpdate({userID: message.author.id}, {punishLevel: user.punishLevel++}, (err, result) =>{ //add a point to the user. Currently 1 point per message.
                        if(err) {
                            console.log(err)
                        }
                    });  
                } else {

                }
                
            }
        });
}

exports.config = {
	
}