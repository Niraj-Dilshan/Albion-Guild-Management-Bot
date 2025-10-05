const { EmbedBuilder } = require("discord.js");
const GuildBankTransaction = require('../../../database/models/GuildBankTransaction');

module.exports = {
  name: "bank-transactions",
  description: "View recent guild bank transactions",
  type: 1,
  options: [
    {
      name: "limit",
      description: "Number of transactions to show (default 10)",
      type: 4, // INTEGER
      required: false,
      min_value: 1,
      max_value: 50,
    },
  ],
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
  },
  run: async (client, interaction, config, db) => {
    const guildId = interaction.guild.id;
    const limit = interaction.options.getInteger('limit') || 10;

    try {
      const transactions = await GuildBankTransaction.find({ guildId })
        .sort({ timestamp: -1 })
        .limit(limit)
        .populate('userId', 'username'); // Assuming userId is string, but to get username, might need to fetch from Discord

      if (transactions.length === 0) {
        return interaction.reply({ content: "No transactions found.", ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setTitle("Recent Guild Bank Transactions")
        .setColor("Yellow")
        .setTimestamp();

      let description = "";
      for (const trans of transactions) {
        const user = await client.users.fetch(trans.userId).catch(() => ({ username: 'Unknown' }));
        const action = trans.type === 'deposit' ? 'Deposited' : 'Withdrew';
        description += `${action} ${trans.quantity} x ${trans.itemName} by ${user.username} at ${trans.timestamp.toLocaleString()}\n`;
      }

      embed.setDescription(description);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: "An error occurred while fetching transactions.", ephemeral: true });
    }
  },
};