const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guildplayers')
    .setDescription('Get All Player Information From Guild'),
  async execute(interaction) {
    try {
      const response = await axios.get('https://gameinfo-sgp.albiononline.com/api/gameinfo/guilds/DE07m4WqTMyJLVU4C90DLg/members');
      const data = response.data.map((member) => ({
        name: member.Name,
        deathFame: member.DeathFame,
        killFame: member.KillFame,
        fameRatio: member.FameRatio,
        pveTotal: member.LifetimeStatistics.PvE.Total,
        gatheringTotal: member.LifetimeStatistics.Gathering.Total,
        craftingTotal: member.LifetimeStatistics.Crafting.Total,
        crystalLeague: member.CrystalLeague,
      }));

      const message = data.map((member) => {
        const caption = `Player: ${member.name}\nDeath Fame: ${member.deathFame}\nKill Fame: ${member.killFame}\nFame Ratio: ${member.fameRatio}\nPvE Total: ${member.pveTotal}\nGathering Total: ${member.gatheringTotal}\nCrafting Total: ${member.craftingTotal}\nCrystal League: ${member.crystalLeague}`;
        return caption;
      });

      const filename = 'GuildPlayers.txt';
      fs.writeFileSync(filename, message.join('\n\n'));

      await interaction.reply({
        files: [
          {
            attachment: filename,
            name: 'GuildPlayers.txt',
          },
        ],
      });
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error while fetching the data from the API.');
    }
  },
};