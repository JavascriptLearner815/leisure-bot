const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
data: new SlashCommandBuilder()
.setName('msg')
.setDescription('Send a message to a user')
.addUserOption(option =>
    option
        .setRequired(true)
        .setName('user')
        .setDescription('The user to message')
)
.addStringOption(option =>
    option
        .setRequired(true)
        .setName('message')
        .setDescription('The message to send')
),
async execute(interaction) {
    const user = interaction.options.getUser('user');
    const message = interaction.options.getString('message');
    let errored = false;

    if (!user || !message) return;

    if (user.bot) return interaction.reply({ content: 'You cannot message a bot!', ephemeral: true });

    if (user.id === interaction.user.id) {
        try {
            user.send({ content: `You noted to yourself: *${message}*`, ephemeral: true });
        } catch (error) {
            console.error(error);
            errored = true;
            interaction.reply({ content: 'Could not message user!', ephemeral: true });
        }
    } else {
        try {
            user.send({ content: `**${interaction.user.tag}** messaged you: *${message}*`, ephemeral: true });
        } catch (error) {
            console.error(error);
            errored = true;
            interaction.reply({ content: 'Could not message user!', ephemeral: true });
        }
        try {
            interaction.user.send({ content: `You messaged **${user.tag}**: *${message}*`, ephemeral: true });
        } catch (error) {
            console.error(error);
            errored = true;
            interaction.reply({ content: 'Could not message user!', ephemeral: true });
        }
    }

    if (errored) return;

    interaction.reply({ content: 'Successfully messaged user!', ephemeral: true });
},
};