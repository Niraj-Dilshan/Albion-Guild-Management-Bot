const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('killboard')
        .setDescription('get killboard data'),
    async execute(interaction) {
        await axios.get(`https://gameinfo-sgp.albiononline.com/api/gameinfo/events?limit=1&offset=0&guildId=DE07m4WqTMyJLVU4C90DLg`)
    .then(async (res) => {
        console.log(res.data); // log the response data
        
        await interaction.reply(`Killboard
        \nKiller: ${res.data.Killer.Name}
        \nVictim: ${res.data.Victim.Name}
        \nKill Fame: ${res.data.TotalVictimKillFame}
        \nKill Area: ${res.data.KillArea}
        \nKill Time: ${res.data.TimeStamp}`);
    })
    .catch((err) => {
        console.log(err);
    });
    },
};