const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('searchplayer')
    .setDescription('Get Player Information')
    .addStringOption(option => 
      option.setName('name')
      .setDescription('The name of the player')
      .setRequired(true)),
  async execute(interaction) {
    try {
      const playerName = interaction.options.getString('name');

      const response = await axios.get('https://gameinfo-sgp.albiononline.com/api/gameinfo/guilds/DE07m4WqTMyJLVU4C90DLg/members');
      const member = response.data.find(member => member.Name.toLowerCase() === playerName.toLowerCase());

      if (!member) {
        await interaction.reply(`Player ${playerName} not found in the guild.`);
        return;
      }

      const playerInfo = {
        name: member.Name,
        deathFame: member.DeathFame,
        killFame: member.KillFame,
        fameRatio: member.FameRatio,
        pveTotal: member.LifetimeStatistics.PvE.Total,
        gatheringTotal: member.LifetimeStatistics.Gathering.Total,
        craftingTotal: member.LifetimeStatistics.Crafting.Total,
        crystalLeague: member.CrystalLeague,
      };

      const messageEmbed = {
        color: 0x0099ff,
        title: `Player Information for ${playerInfo.name}`,
        fields: [
          {
            name: 'Death Fame',
            value: `${playerInfo.deathFame}`,
            inline: true,
          },
          {
            name: 'Kill Fame',
            value: `${playerInfo.killFame}`,
            inline: true,
          },
          {
            name: 'Fame Ratio',
            value: `${playerInfo.fameRatio}`,
            inline: true,
          },
          {
            name: 'PvE Total',
            value: `${playerInfo.pveTotal}`,
            inline: true,
          },
          {
            name: 'Gathering Total',
            value: `${playerInfo.gatheringTotal}`,
            inline: true,
          },
          {
            name: 'Crafting Total',
            value: `${playerInfo.craftingTotal}`,
            inline: true,
          },
          {
            name: 'Crystal League',
            value: `${playerInfo.crystalLeague}`,
            inline: true,
          },
        ],
      };

      await interaction.reply({ embeds: [messageEmbed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error while fetching the data from the API.');
    }
  },
};