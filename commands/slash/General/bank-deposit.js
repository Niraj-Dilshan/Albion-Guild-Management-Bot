const { EmbedBuilder } = require("discord.js");
const GuildBankItem = require('../../../database/models/GuildBankItem');
const GuildBankTransaction = require('../../../database/models/GuildBankTransaction');

module.exports = {
  name: "bank-deposit",
  description: "Deposit items into the guild bank",
  type: 1,
  options: [
    {
      name: "item",
      description: "The name of the item to deposit",
      type: 3, // STRING
      required: true,
    },
    {
      name: "quantity",
      description: "The quantity to deposit",
      type: 4, // INTEGER
      required: true,
      min_value: 1,
    },
  ],
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
  },
  run: async (client, interaction, config, db) => {
    const guildId = interaction.guild.id;
    const userId = interaction.user.id;
    const itemName = interaction.options.getString('item');
    const quantity = interaction.options.getInteger('quantity');

    try {
      // Update or create the item in bank
      let item = await GuildBankItem.findOne({ guildId, itemName });
      if (item) {
        item.quantity += quantity;
        await item.save();
      } else {
        item = new GuildBankItem({ guildId, itemName, quantity });
        await item.save();
      }

      // Log the transaction
      const transaction = new GuildBankTransaction({
        guildId,
        type: 'deposit',
        itemName,
        quantity,
        userId,
      });
      await transaction.save();

      const embed = new EmbedBuilder()
        .setTitle("Guild Bank Deposit")
        .setDescription(`Successfully deposited ${quantity} x ${itemName} into the guild bank.`)
        .setColor("Green")
        .setTimestamp();

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: "An error occurred while processing the deposit.", ephemeral: true });
    }
  },
};