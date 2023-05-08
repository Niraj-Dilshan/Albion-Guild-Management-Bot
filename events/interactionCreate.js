const { Collection } = require('discord.js');

// Create a collection to store the timestamps of each user's command usage
const cooldowns = new Collection();

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		// Check if the interaction is a slash command
		if (!interaction.isCommand()) return;

		// Get the command and its cooldown
		const command = interaction.client.commands.get(interaction.commandName);
		const cooldownTime = (command.cooldown || 0) * 1000;

		// Check if the user is on cooldown for this command
		const userCooldowns = cooldowns.get(interaction.user.id) || new Collection();
		const lastUsage = userCooldowns.get(command.name) || 0;
		const timeSinceLastUsage = Date.now() - lastUsage;

		if (timeSinceLastUsage < cooldownTime) {
			const remainingCooldown = cooldownTime - timeSinceLastUsage;
			await interaction.reply(`You must wait ${remainingCooldown / 1000} seconds before using this command again.`);
			return;
		}

		// Update the user's cooldown for this command
		userCooldowns.set(command.name, Date.now());
		cooldowns.set(interaction.user.id, userCooldowns);

		try {
			await command.execute(interaction);
		} catch (error) {
			// Catch the "Interaction has already been acknowledged" error
			if (error.code === 40060) return;

			console.error(`Error executing ${command.name}`);
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
