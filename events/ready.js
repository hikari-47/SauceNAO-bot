const client = require('..');

client.once('ready', () => {
    console.log('Ready!')
    client.user.setStatus('online')
})
