const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "add-admins",
  description: "add admins to the bot",
  type: 1,
  options: [
    {
      name: "user",
      description: "The user you want to add as an admin",
      type: 6,
      required: true,
    },
    {
      name: "discord-id",
      description: "The discord id of the user you want to add as an admin",
      type: 3,
      required: true,
    },
  ],
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
  },
  run: async (client, interaction, config, db) => {
    const user = interaction.options.getUser("user");
    const discordId = interaction.options.getString("discord-id");
    if (!config.Users.OWNERS.includes(interaction.user.id)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("You are not an owner of the bot!")
            .setColor("RED"),
        ],
        ephemeral: true,
      });
    } else {
      if (config.Users.ADMINS.includes(discordId)) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription("This user is already an admin!")
              .setColor("RED"),
          ],
          ephemeral: true,
        });
      } else {
        config.Users.ADMINS.push(discordId);
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription("User has been added as an admin!")
              .setColor("GREEN"),
          ],
          ephemeral: true,
        });
      }
    }
  },
};
