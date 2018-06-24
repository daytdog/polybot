exports.run = (bot, message, args) => {
	var responseTime = new Date().getTime() - message.createdTimestamp;
	message.reply(`Pong!`).catch(console.error);
}

exports.config = {
	
}