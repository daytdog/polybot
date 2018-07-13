exports.run = (bot, message, args) => {
	//config
    const config = require('../config.json');
    const Discord = require("discord.js");

    //Database
    const mongoose = require('mongoose');
    mongoose.connect(config.testDatabase);
    const User = require("../../models/user.js");

    function swapArrayElements(arr, indexA, indexB){
        var temp = arr[indexA]; //stores A value in a variable because it will be overridden.
        arr[indexA] = arr[indexB]; //places B in A's spot
        arr[indexB] = temp; //places A (stored in temp) in B's old spot.
    };

    function bubbleSortUsers(arr){
        let swapped;
        do {
            swapped = false;
            for (var i=0; i < arr.length-1; i++) {
                if (arr[i].points < arr[i+1].points) {
                    var temp = arr[i]; //stores arr[i] in temporary value because arr[i] will be overridden
                    arr[i] = arr[i+1]; //swaps arr[i] with arr[i+1] (because arr[i+1] is bigger)
                    arr[i+1] = temp; //sets arr[i] in arr[i+1]'s old place.
                    swapped = true; //continues the loop
                }
            }
        } while (swapped);
    }  //thank you Ignatius Andrew (stackoverflow.com)

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
                //QuickSort Algorithm (sorta)
                let partition = users[Math.floor(Math.random() * users.length)] //select partition
                let l1 = []; // > partition
                let l2 = []; // < partition
                users.forEach(function (user){ //compare all users to partition. if they're greater than, sort them in l1, else, l2
                    if(user.points > partition.points){
                        l1.push(user);
                    } else if(user.points < partition.points) {
                        l2.push(user);
                    }
                });
                //sort sublists
                bubbleSortUsers(l1);
                bubbleSortUsers(l2);

                //concatenate the two lists and the partition.
                l1.push(partition); //partition will always end up either being l1 or immediately after it.
                let leaderboard = l1.concat(l2);
                
                const leaderboardEmbed = new Discord.RichEmbed()
                .setTitle(`Cookies | Leaderboard`)
                .setDescription(`❯ 1)  **${leaderboard[0].tag}** :cookie:: ${leaderboard[0].points}
❯ 2) **${leaderboard[1].tag}** :cookie:: ${leaderboard[1].points}
❯ 3) **${leaderboard[2].tag}** :cookie:: ${leaderboard[2].points}
❯ 4) **${leaderboard[3].tag}** :cookie:: ${leaderboard[3].points}
❯ 5) **${leaderboard[4].tag}** :cookie:: ${leaderboard[4].points}`) //This isn't very DRY but it's necessary for the formatting I wanted to implement. Hooray, UI!
                .setColor(0x2add1a)
                .setTimestamp();
                message.channel.send(leaderboardEmbed);
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