const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register a new user with a guild')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Albion Username')
                .setRequired(true)),
    async execute(interaction) {
        const newUsername = interaction.options.getString('username');
        await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${newUsername}`)
        .then(async (res) => {
          const result = res.data.players.filter(obj => obj.Name === newUsername);
            if (result.length > 0) {
                await interaction.member.setNickname(newUsername);
                await interaction.reply(`Username: ${newUsername} Has Been Successfully Registered`);
            } else {
                await interaction.reply(`Username: ${newUsername} \n Can't Find The Player In Albion Database`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    },
};