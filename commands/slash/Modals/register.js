const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "register",
    description: "Register a new user with a guild",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const modal = new ModalBuilder()
            .setCustomId('guildRegister')
            .setTitle('Register With Guild');

        const username = new TextInputBuilder()
            .setCustomId('username')
            .setLabel("Type your Albion Ingame username (IGN)")
            .setStyle(TextInputStyle.Short);

        const ActionRow = new ActionRowBuilder().addComponents(username);

        modal.addComponents(ActionRow);

        await interaction.showModal(modal);
    },
};
