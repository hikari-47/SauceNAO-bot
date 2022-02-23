const { readdirSync, read } = require('fs');
const client = require('..');

module.exports = (client) => {
    readdirSync('./events/').forEach(file => {
        const events = readdirSync(`./events/`).filter(file => file.endsWith('.js'));
        for (const file of events) {
            const event = require(`../events/${file}`);
            if (event.name)
                client.events.set(event.name, event)
        }
    })
}
