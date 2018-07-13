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
            if(!foundUser){ //create new user if there is none.
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
                }).then(
                    User.find({userID: userID}, (err, foundUsers) => {
                        //Refactor Needed, like really bad.
                        //the following checks for duplicate users and deletes the one with the least amount of points.
                        if(foundUsers.length > 1) {
                            console.log(`Duplicate user for ${foundUsers[0].tag} detected! Deleting new user...`)
                            if(foundUsers.length > 2){
                                console.log(`Error! Too many users! Problematic User (indexed @ 0) => ${foundUsers[0]}`);
                            }
                            else if(foundUsers[0].points > foundUsers[1].points){
                                User.findOneAndRemove({_id: foundUsers[1]._id}, (err) => {if(err) console.error(err);})
                            } else if(foundUsers[0].points < foundUsers[1].points){
                                User.findOneAndRemove({_id: foundUsers[0].id}, (err) => {if(err) console.error(err);})
                            } 
                        }
                    })
                )
            }
        }
    })
}

exports.checkUser = function(userID, username, tag) {
    User.findOne({userID: userID}, (err, foundUser) => { //if there's a user in the database
        if(err){
            console.err(err)
        } else {
            if(!foundUser){ //create new user if there is none.
                var newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    username: username,
                    userID: userID,
                    tag: tag,
                    points: 0
                });
                newUser.save()
                .then(res => console.log(`New user has no database entry! Created new entry in database for: ${tag}`))
                .catch(err => console.log(err));
            }
        }
    }
)
}

exports = (bot) => {
//anything put in here will be executed on load. var bot is imported into this funciton.
//you must manually add this function sans any exports shown above in order to execute this function.
}