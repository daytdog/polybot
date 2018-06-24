exports.run = (bot, message, args) => {
const config = require('../config.json');
//message clean function
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
//command
	if(message.author.id !== config.ownerID) return;
	//prevents anyone but owner of the bot from using command.

	try {
		const code = args.join(" ");
		let evaled = eval(code);

		if(typeof evaled !== "string")
		evaled = require("util").inspect(evaled);

		message.channel.send(clean(evaled), {code: "xl"});
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
	}
}

exports.config = {

}