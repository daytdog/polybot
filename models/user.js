const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    username: {
        type: String, 
        required: true
    },
    userID: {
        type: String, 
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    points: Number
})

var userModel = mongoose.model("User", userSchema)
module.exports = userModel 