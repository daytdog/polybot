exports.run = (bot, message, args) => {
	const config = require('../config.json');
	if(message.author.id !== config.ownerID) return;

	const Discord = require("discord.js");

	//prevents anyone but owner of the bot from using command.

	if(!args || args.size < 1) {
		message.reply("You must provide a command name to reload.");
	}
	
	delete require.cache[require.resolve(`./${args[0]}.js`)];

	const reloadEmbed = new Discord.RichEmbed()
  .setDescription(`**:white_check_mark: Command .${args[0]} reloaded**`)
  .setColor(0x2add1a)
  .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
  .setTimestamp();

  message.channel.send(reloadEmbed);
};