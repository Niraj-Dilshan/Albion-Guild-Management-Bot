const { EmbedBuilder } = require("discord.js");
const GuildBankItem = require('../../../database/models/GuildBankItem');
const GuildBankTransaction = require('../../../database/models/GuildBankTransaction');

module.exports = {
  name: "bank-withdraw",
  description: "Withdraw items from the guild bank",
  type: 1,
  options: [
    {
      name: "item",
      description: "The name of the item to withdraw",
      type: 3, // STRING
      required: true,
    },
    {
      name: "quantity",
      description: "The quantity to withdraw",
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
      const item = await GuildBankItem.findOne({ guildId, itemName });
      if (!item || item.quantity < quantity) {
        return interaction.reply({ content: "Insufficient quantity in the guild bank.", ephemeral: true });
      }

      item.quantity -= quantity;
      if (item.quantity === 0) {
        await item.deleteOne();
      } else {
        await item.save();
      }

      // Log the transaction
      const transaction = new GuildBankTransaction({
        guildId,
        type: 'withdrawal',
        itemName,
        quantity,
        userId,
      });
      await transaction.save();

      const embed = new EmbedBuilder()
        .setTitle("Guild Bank Withdrawal")
        .setDescription(`Successfully withdrew ${quantity} x ${itemName} from the guild bank.`)
        .setColor("Red")
        .setTimestamp();

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: "An error occurred while processing the withdrawal.", ephemeral: true });
    }
  },
};