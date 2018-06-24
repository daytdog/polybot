exports.run = (bot, message, args) => {

    if(message.author.id !== config.ownerID) return;
    
    const config = require('../config.json');

    const User = require("../../models/user.js")
    const mongoose = require('mongoose');
    mongoose.connect(config.testDatabase)

    if(User.find({userID: `${message.author.id}`})){
        message.reply("Found it, boss!");
    };
    
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        username: message.author.username,
        points: 1
    })

    user.save()
    .then(result => message.reply(result))
    .catch(err => console.log(err));

    message.reply("Set up user account for: " + message.author.username);
}

exports.config = {
	
}