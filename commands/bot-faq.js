const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
.setName('bot-faq')
.setDescription('View answers to frequently asked questions about this bot!'),
async execute(interaction) {
const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Select a question!')
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions(
                {
                    label: 'Question 1',
                    description: 'How do I use the bot?',
                    value: 'first_option',
                },
                {
                    label: 'Question 2',
                    description: `Where'd my message go?`,
                    value: 'second_option',
                },
                {
                    label: 'Question 3',
                    description: `Why can't other people see when I use a command?`,
                    value: 'third_option',
                },
            ),
    );
await interaction.reply({ components: [row], ephemeral: true });
},
};