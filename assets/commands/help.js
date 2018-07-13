exports.run = (bot, message, args) => {
	const config = require('../config.json');
	
	if(message.channel.id !== config.botCommandChannel){
		message.delete(500);
	}

	message.reply("I've sent you a DM!")
	

	message.author.send(`**HELP AND COMMANDS**\n${new Date()}
PolyBot ${config.version}. Under Development.
Made by daytdog#0001. http://dayt.dog/\n
\`\`\`
\`\`\`
To run a command, use \`.<command>\`
Commands must be used in the #bot-commands channel.
**__Commands available to you:__** \n
__Informational Commands__ \n
\`help\`: Provides a list of commands available to you.
\`ping\`: Tests the delay between responses from the bot.

__Cookie Commands__
*Cookies are a currency earned for every message sent in the server.*\n
\`cookies\`: (Optional: \`<@user>\` or \`<leaderboard>\`): Shows you how many cookies you or another user has.
`);

	if(message.member.roles.get(config.administratorRoleID)) {
		message.author.send(`
\n__Administrator-Only Commands__  \n
\`lockdown #<channel> <duration(mins)>\`: Lock-down a channel for specified duration. Duration is not required but encouraged. Can use 'server' in place of a channel name.
\`unlock #<channel>\`: Unlock a specified channel. Can use 'server' in place of a channel name.
		`)
	}

	if(message.author.id === config.ownerID) {
		message.author.send(`
\n__Dayton-Only Commands__ \n
\`eval\`: Evaluate JS Code.
\`reload <command>\`: Reloads files for specified command.
		`);
	};

}

exports.config = {

}