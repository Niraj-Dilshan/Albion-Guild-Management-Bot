const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "searchplayer",
    description: "search any player in the game stats",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const modal = new ModalBuilder()
            .setCustomId('searchPlayer')
            .setTitle('Search Albion Online Players Stats');

        const username = new TextInputBuilder()
            .setCustomId('username')
            .setLabel("Enter Albion IGN to Search")
            .setStyle(TextInputStyle.Short);

        const server = new TextInputBuilder()
            .setCustomId('server')
            .setLabel("Type the server name East Or West")
            .setStyle(TextInputStyle.Short);

        const usernameRow = new ActionRowBuilder().addComponents(username); 

        const serverRow = new ActionRowBuilder().addComponents(server);
        
        modal.addComponents(usernameRow, serverRow);

        await interaction.showModal(modal);
    },
};
