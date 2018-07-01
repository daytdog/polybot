// PolyMatter Official Bot
// Copyright © 2018 Dayton Baird

const Discord = require("discord.js");
const bot = new Discord.Client();

//Configuration
const config = require('./assets/config.json');
const prefix = config.prefix;

//Database
const mongoose = require('mongoose');
mongoose.connect(config.testDatabase);
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function(){
	console.log("Connected to the database!");
})
const User = require("./models/user.js");

//imports functions
const utilFunctions = require("./assets/utilFunctions.js")(bot);
const updatePoints = require("./assets/clientFunctions.js").updatePoints;

//Events
bot.on('message', (message) => {  //Triggers every time a message is sent.
	if(message.author.bot) return;
	if(!message.content) return;
	if(message.channel.type === "dm") return;
	
	//Add Points for the message
	updatePoints(message.author.id, message.author.username, message.author.tag);
	
	//BEGIN MESSAGE LOGGING
	const mLog = new Discord.RichEmbed()
	.setTitle(`*${message.channel.name}*`)
	.setAuthor(`${message.author.username}`)
	.setColor(0x2f3136)
	.setDescription(`"${message.content}"`)
	.setFooter(`Message by ${message.author.username}`)
	.setTimestamp();
	
	if(message.attachments.first()) {
		mLog.setImage(`${message.attachments.first().url}`);
		mLog.setColor(0xf9b52c);
	}
	
	if(message.author.avatarURL) {
		mLog.setAuthor(`${message.author.username}`, `${message.author.avatarURL}`);
	}
	
	if(message.content.indexOf(config.prefix) == 0) {
		mLog.setColor(0xf6ff00);
		mLog.setDescription(`Command: "${message.content}"`);
	}
	
	bot.channels.get(config.botLogChannel).send(mLog);
	// END OF MESSAGE LOGGING
	
	// BEGIN COMMAND HANDLING
	if(message.content.indexOf(config.prefix) !== 0) return;
	
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	//case-insensitve  
	
	//command handler
	try {
		let commandFile = require(`./assets/commands/${command}.js`);
		
		if(command !== "help" && message.channel.id !== config.botCommandChannel) return;
		//only .help can be used in channels besides the botCommandCHannel.
		commandFile.run(bot, message, args);
		//.run is defined in the module (command)'s export.
	} catch (err) {
		console.error(err);
	}
});
//END COMMAND HANDLING

bot.on('error', e => {
	console.error(e);
    console.log(e);
});

//on bot startup
bot.on('ready', () => {
	console.log('I\'ve joined the server!');
    bot.user.setGame("Use .help for commands")
})

//New User Joins Event
bot.on('guildMemberAdd', (member) => {
	console.log('New user: ' + member.user.username + ' has joined the server!'); 

//Make an embed for every new user join.
	const nJoin = new Discord.RichEmbed()
.setAuthor(`${member.user.tag} (${member.user.id})`)
.setColor(0x77f24b)
.setFooter(`User Joined`)
.setTimestamp();

	if(member.user.avatarURL) {
		nJoin.setAuthor(`${member.user.tag} (${member.user.id})`, `${member.user.avatarURL}`);
	}
	bot.channels.get(config.newJoinChannel).send(nJoin);

//Join cooldown
	member.addRole(config.cooldownRole).catch(console.error);
	
	setTimeout(function() {
		member.removeRole(config.cooldownRole).catch(console.error);
	}, 30000);
	
	setTimeout(function(){
		member.user.send(`\`\`\`
You are now free to chat on the server.\`\`\``)
	}, 30000)

	//Send new user a welcome DM.
	member.user.send(`**:large_orange_diamond: :small_orange_diamond: Welcome to the PolyMatter Official Discord! :small_orange_diamond: :large_orange_diamond:** \n
Welcome! \`To prevent raids, you are currently on a 30 second join cooldown.\` You will be able to chat the server once the cooldown has ended. In the meantime, we invite you to read the rules.\n
*My name is PolyBot, and this action was performed automatically. To see my commands, use .help in the #bot-commands room.*`)
});



//User Leaves Event
bot.on('guildMemberRemove', (member) => {
	console.log('User ' + member.user.username + ' has left the server.');
	const uLeft = new Discord.RichEmbed()
	.setAuthor(`${member.user.tag} (${member.user.id})`)
	.setColor(0xe01c0b)
	.setFooter(`User Left`)
	.setTimestamp();

	if(member.user.avatarURL) {
		uLeft.setAuthor(`${member.user.tag} (${member.user.id})`, `${member.user.avatarURL}`);
	}

	bot.channels.get(config.newJoinChannel).send(uLeft)
});

//login
bot.login(config.testbot);