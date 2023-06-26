const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
const initializeDatabase = require('../database/database');
const mongoose = initializeDatabase();

module.exports = {
    id: "guildRegister",
    run: async (client, interaction, config) => {
        const name = interaction.fields.getTextInputValue('username');
        const discordName = interaction.member.user.username;
        const guildid = interaction.guild.id;
        const guildname = interaction.guild.name;
        const db = mongoose.connection.useDb(guildid);
        const dbmodel = db.model('User', new mongoose.Schema({ discordId: String, discordName: String, albionId: String, albionName: String , guildName: String}));
        await axios.get(`https://gameinfo-sgp.albiononline.com/api/gameinfo/search?q=${name}`)
        .then(async (res) => {
            const result = res.data.players.filter(obj => obj.Name === name);
                if (result.length > 0) {
                    await interaction.member.setNickname(name);
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Username: ${name} Has Been Successfully Registered`)
                        ],
                        ephemeral: true
                    });
                    const user = await dbmodel.findOne({ discordId: interaction.member.id });
                    if (user) {
                        await dbmodel.updateOne({ discordId: interaction.member.id },{ discordName: discordName, albionId: result[0].Id, albionName: name, guildName: guildname });
                    } else {
                        await dbmodel.create({ discordId: interaction.member.id, discordName: discordName, albionId: result[0].Id, albionName: name, guildName: guildname });
                    }   
                } else {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Username: ${name} \n Can't Find The Player In Albion Database`)
                        ],
                        ephemeral: true
                    });
                }
        })
        .catch((err) => {
            console.log(err);
        });
    },
};