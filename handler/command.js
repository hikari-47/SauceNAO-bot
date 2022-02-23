const { readdirSync, read } = require('fs');
const client = require('..');

module.exports = (client) => {
    readdirSync('./commands/').forEach(file => {
        const commands = readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const command = require(`../commands/${file}`);
            if (command.name)
                client.commands.set(command.name, command)
            if (command.aliases && Array.isArray(command.aliases))
                command.aliases.forEach(alias => client.aliases.set(alias, command.name))
        }
    })
}
