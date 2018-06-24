const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    points: Number
})

var userModel = mongoose.model("User", userSchema)
module.exports = userModel 