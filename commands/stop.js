const { SlashCommandBuilder } = require('@discordjs/builders');
const { ownerId } = require('../config.json');

module.exports = {
data: new SlashCommandBuilder()
.setName('stop')
.setDescription('Stops the bot from running! This command is limited to bot owner!'),
async execute(interaction) {
    await interaction.reply({ content: 'Shutting down bot!', ephemeral: true });
    if (interaction.user.id === ownerId) await process.exit(0);
},
};