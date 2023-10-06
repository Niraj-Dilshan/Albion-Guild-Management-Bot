const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "viewevents",
  description: "show upcoming events",
  type: 1,
  options: [],
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
  },
  run: async (client, interaction, config, db) => {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Working in progress")
          .setColor("Blue"),
      ],
      ephemeral: true,
    });
  },
};