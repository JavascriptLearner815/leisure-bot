const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
data: new SlashCommandBuilder()
.setName('server')
.setDescription('Replies with server info!'),
async execute(interaction) {
    await interaction.reply({ content: `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`, ephemeral: true });
},
};