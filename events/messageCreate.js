const { Collection } = require('discord.js');
const { prefix } = require('../config.json');
const client = require('..');

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (cmd.length == 0) return;
    if (!command) return;
    if (command)
        command.run(client, message, args)
})
