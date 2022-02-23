module.exports = {
    name: 'ping',
    description: 'The WebSocket manager of the client',
    run: async(client, message, args) => {
        const response = await message.reply('Analyzing...');
        await response.edit(`Ping ${client.ws.ping} ms!`)
    }
}
