//config
const config = require('./config.json');

//Database
const mongoose = require('mongoose');
mongoose.connect(config.testDatabase);
const User = require("../models/user.js");

//Functions
exports.updatePoints = function(userID, username, tag) {
    User.findOne({userID: userID}, (err, foundUser) =>{ //if there's a user in the database
        if(err){
            console.err(err)
        } else {
            if(!foundUser){
                var newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    username: username,
                    userID: userID,
                    tag: tag,
                    points: 1
                });
                newUser.save()
                .then(res => console.log(`No Points! New user created in database for user: ${tag}`))
                .catch(err => console.log(err));
            } else {
                User.findOneAndUpdate({userID: userID}, {points: foundUser.points + 1}, {upsert: true}, (err, result) =>{ //add a point to the user. Currently 1 point per message.
                    if(err) {
                        console.log(err)
                    }
                })
            }
            
        }
    })
}

exports = (bot) => {
//anything put in here will be executed on load. var bot is imported into this funciton.
//you must manually add this function sans any exports shown above in order to execute this function.
}