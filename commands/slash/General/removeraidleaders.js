const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "remove-raidleaders",
  description: "remove raid leaders from the bot",
  type: 1,
  options: [
    {
      name: "user",
      description: "The user you want to remove as a raid leader",
      type: 6,
      required: true,
    },
    {
      name: "discord-id",
      description:
        "The discord id of the user you want to remove as a raid leader",
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
      if (!config.Users.RAIDLEADERS.includes(discordId)) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription("This user is not a raid leader!")
              .setColor("RED"),
          ],
          ephemeral: true,
        });
      } else {
        config.Users.RAIDLEADERS = config.Users.RAIDLEADERS.filter(
          (raidleader) => raidleader !== discordId
        );
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription("User has been removed as a raid leader!")
              .setColor("GREEN"),
          ],
          ephemeral: true,
        });
      }
    }
  },
};
