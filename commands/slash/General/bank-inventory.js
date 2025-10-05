const { EmbedBuilder } = require("discord.js");
const GuildBankItem = require('../../../database/models/GuildBankItem');

module.exports = {
  name: "bank-inventory",
  description: "View the guild bank inventory",
  type: 1,
  options: [],
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
  },
  run: async (client, interaction, config, db) => {
    const guildId = interaction.guild.id;

    try {
      const items = await GuildBankItem.find({ guildId }).sort({ itemName: 1 });

      if (items.length === 0) {
        return interaction.reply({ content: "The guild bank is empty.", ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setTitle("Guild Bank Inventory")
        .setColor("Blue")
        .setTimestamp();

      let description = "";
      for (const item of items) {
        description += `${item.itemName}: ${item.quantity}\n`;
      }

      embed.setDescription(description);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: "An error occurred while fetching the inventory.", ephemeral: true });
    }
  },
};