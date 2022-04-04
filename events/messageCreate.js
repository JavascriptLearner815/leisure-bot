const { clientId } = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (message.mentions.users.first().id === clientId) message.reply('Hello there!')
    }
}