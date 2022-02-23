const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: 32767 });
const { token } = require('./config.json');

client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection()

module.exports = client;

['command', 'event'].forEach(handler => {
    require(`./handler/${handler}`)(client)
})

client.login(token)
