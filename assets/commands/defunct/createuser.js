exports.run = (bot, message, args) => {
    
    const config = require('../config.json');

    const mongoose = require('mongoose');
    mongoose.connect(config.testDatabase);
    const dbConnection = mongoose.connection;
    dbConnection.on('error', console.error.bind(console, 'connection error:'));
    dbConnection.once('open', () =>{
        console.log("Connected to the database!");
    })
    const User = require("../../models/user.js");
        
    if(message.author.id !== config.ownerID) return;
        var newUser = new User({
            _id: mongoose.Types.ObjectId(),
            username: message.author.username,
            userID: message.author.id,
            tag: message.author.tag,
            points: 0
        });
        newUser.save()
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

exports.config = {
	
}