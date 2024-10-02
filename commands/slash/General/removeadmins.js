// Import the necessary module
const { EmbedBuilder } = require("discord.js");

// Export the command configuration object
module.exports = {
  // Command metadata
  name: "remove-admins",
  description: "remove admins from the bot",
  type: 1, // Type 1 indicates this is a slash command
  
  // Command options
  options: [
    {
      name: "user",
      description: "The user you want to remove as an admin",
      type: 6, // Type 6 represents a USER option
      required: true,
    },
    {
      name: "discord-id",
      description: "The discord id of the user you want to remove as an admin",
      type: 3, // Type 3 represents a STRING option
      required: true,
    },
  ],
  
  // Permissions required to use this command
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages", // This seems to be a custom permission system
  },
  
  // Function to execute when the command is called
  run: async (client, interaction, config, db) => {
    // Get the user and Discord ID from the command options
    const user = interaction.options.getUser("user");
    const discordId = interaction.options.getString("discord-id");
    
    // Check if the user executing the command is an owner
    if (!config.Users.OWNERS.includes(interaction.user.id)) {
      // If not an owner, reply with an error message
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("You are not an owner of the bot!")
            .setColor("RED"),
        ],
        ephemeral: true, // Make the reply visible only to the user who executed the command
      });
    } else {
      // If the user is an owner, check if the target user is an admin
      if (!config.Users.ADMINS.includes(discordId)) {
        // If not an admin, reply with an error message
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription("This user is not an admin!")
              .setColor("RED"),
          ],
          ephemeral: true,
        });
      } else {
        // Remove the user from the admins array
        config.Users.ADMINS = config.Users.ADMINS.filter(
          (admin) => admin !== discordId
        );
        
        // Reply with a success message
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription("User has been removed as an admin!")
              .setColor("GREEN"),
          ],
          ephemeral: true,
        });
      }
    }
  },
};
