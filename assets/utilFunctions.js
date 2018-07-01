module.exports = (bot) => {

  //Logging
  const fs = require("fs");
  const util = require('util');
  
  //config
  const config = require('./config.json');

  //Database
  const mongoose = require('mongoose');
  mongoose.connect(config.testDatabase);
  const User = require("../models/user.js");

  //logging. Writes to "log.txt"
  var logFile = fs.createWriteStream('./logs/log.txt', { flags: 'a'});
  var logStdout = process.stdout;

  console.log = function() {
    logFile.write(new Date() + ' | | ' + util.format.apply(null, arguments) + '\n');
    logStdout.write(util.format.apply(null, arguments) + '\n');
  }
  console.error = console.log;

  //error catching
  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: \n" + err.stack);
  });

  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
    process.exit(1);
  });

}
