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

      const date = new Date().toISOString().slice(0, 10);
      const fileName = `GuildMembers${date}.txt`;

      const sentPlayers = new Set();
      const stream = fs.createWriteStream(fileName);
      
      for (const player of data) {
        if (sentPlayers.has(player.name)) {
          continue; // skip players that have already been processed
        }
        
        const message = `Name: ${player.name}\nDeath Fame: ${player.deathFame}\nKill Fame: ${player.killFame}\nFame Ratio: ${player.fameRatio}\nPvE Total: ${player.pveTotal}\nGathering Total: ${player.gatheringTotal}\nCrafting Total: ${player.craftingTotal}\nCrystal League: ${player.crystalLeague}\n\n`;
        stream.write(message);
        sentPlayers.add(player.name);
      }
      
      stream.end();

      await interaction.channel.send({
        content: `Here is the list of all guild members as of ${date}`,
        files: [
          {
            attachment: fileName,
            name: fileName,
          },
        ],
      });

      await interaction.reply('Player information has been sent to this channel.');

      // Delete the txt file after it has been sent.
      fs.unlink(fileName, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error while fetching the data from the API.');
    }
  },
};