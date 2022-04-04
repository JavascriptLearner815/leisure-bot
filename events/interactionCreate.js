module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        executeCommands(interaction);
        executeSelectMenus(interaction);
    }
}

async function executeCommands(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command! The owner has been notified of the error!', ephemeral: true });
    }
}

async function executeSelectMenus(interaction) {
    if (!interaction.isSelectMenu()) return;

    let content = ``;

	if (interaction.customId === 'select') {
        await interaction.values.forEach(value => {
            if (value === 'first_option') content = content.concat(`\n\n`, `**How do I use the bot?**\nThis bot uses Discord's new slash commands feature. Just type "/" and all of its commands will appear for you! The slash commands have a user-friendly layout that shows you how to use the command easily.`);
            if (value === 'second_option') content = content.concat(`\n\n`, `**Where'd my message go?**\nThis bot mainly uses "ephemeral" messages, which are only shown to you and can be dismissed at the bottom. You probably dismissed it.`);
            if (value === 'third_option') content = content.concat(`\n\n`, `**Why can't other people see when I use a command?**\nThis bot mainly uses "ephemeral" messages, which are only shown to you and can be dismissed at the bottom.`);
        });

        await interaction.update({ content, components: [], ephemeral: true })
	}
}