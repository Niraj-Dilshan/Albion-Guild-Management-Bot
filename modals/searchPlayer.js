const { EmbedBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    id: "searchPlayer",
    run: async (client, interaction, config) => {
        const name = interaction.fields.getTextInputValue('username');
        const server = interaction.fields.getTextInputValue('server');

        if (server.toLowerCase() === 'east') {
            await axios.get(`https://gameinfo-sgp.albiononline.com/api/gameinfo/search?q=${name}`)
            .then(async (res) => {
                const result = res.data.players.filter(obj => obj.Name === name);
                    if (result.length > 0) {
                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle('Albion Online Player Stats')
                                    .setColor("Gold")
                                    .setFooter({
                                    text: "Made By Black-Rose Bot",
                                    iconURL:
                                        "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                                    })
                                    .setTimestamp()
                                    .setImage("https://cdn.discordapp.com/attachments/1068765395835699242/1138427848261128202/BLACKROSE.png")
                                    .addFields([
                                        {
                                            name: ' ',
                                            value: result[0].Id ? `** ID : **${result[0].Id.toString()}` : "** ID : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].Name ? `**Name : **${result[0].Name.toString()}` : "**Name : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].GuildId ? `**Guild Id : **${result[0].GuildId.toString()}` : "**Guild Id : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].GuildName ? `**Guild Name : **${result[0].GuildName.toString()}` : "**Guild Name : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].AllianceId ? `**Alliance Id : **${result[0].AllianceId.toString()}` : "**Alliance Id : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].AllianceName ? `**Alliance Name : **${result[0].AllianceName.toString()}` : "**Alliance Name : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].KillFame ? `**Kill Fame : **${result[0].KillFame.toString()}` : "**Kill Fame : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].DeathFame ? `**Death Fame: : **${result[0].DeathFame.toString()}` : "**Death Fame: : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].FameRatio ? `**Fame Ratio : **${result[0].FameRatio.toString() }`: "**Fame Ratio : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].totalKills ? `**Total Kills : **${result[0].totalKills.toString()}` : "**Total Kills : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].gvgKills ? `**GVG Kills : **${result[0].gvgKills.toString()}` : "**GVG Kills : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].gvgWon ? `**GVG Won : **${result[0].gvgWon.toString()}` : "**GVG Won : **Null",
                                            inline: false,
                                        },
                                    ])
                            ],
                        });  
                    } else {
                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                .setTitle('Albion Online Player Stats')
                                .setColor("Gold")
                                .setFooter({
                                text: "Made By Black-Rose Bot",
                                iconURL:
                                    "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                                })
                                .setTimestamp()
                                .setImage("https://cdn.discordapp.com/attachments/1068765395835699242/1138427848261128202/BLACKROSE.png")
                                .setDescription(`Username: ${name} \n Can't Find The Player In Albion Database`)
                            ],
                        });
                    }
            })
            .catch((err) => {
                console.log(err);
            });
        } else if (server.toLowerCase() === 'west') {
            await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${name}`)
            .then(async (res) => {
                const result = res.data.players.filter(obj => obj.Name === name);
                    if (result.length > 0) {
                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle('Albion Online Player Stats')
                                    .setColor("Gold")
                                    .setFooter({
                                    text: "Made By Black-Rose Bot",
                                    iconURL:
                                        "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                                    })
                                    .setTimestamp()
                                    .setImage("https://cdn.discordapp.com/attachments/1068765395835699242/1138427848261128202/BLACKROSE.png")
                                    .addFields([
                                        {
                                            name: ' ',
                                            value: result[0].Id ? `** ID : **${result[0].Id.toString()}` : "** ID : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].Name ? `**Name : **${result[0].Name.toString()}` : "**Name : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].GuildId ? `**Guild Id : **${result[0].GuildId.toString()}` : "**Guild Id : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].GuildName ? `**Guild Name : **${result[0].GuildName.toString()}` : "**Guild Name : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].AllianceId ? `**Alliance Id : **${result[0].AllianceId.toString()}` : "**Alliance Id : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].AllianceName ? `**Alliance Name : **${result[0].AllianceName.toString()}` : "**Alliance Name : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].KillFame ? `**Kill Fame : **${result[0].KillFame.toString()}` : "**Kill Fame : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].DeathFame ? `**Death Fame: : **${result[0].DeathFame.toString()}` : "**Death Fame: : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].FameRatio ? `**Fame Ratio : **${result[0].FameRatio.toString() }`: "**Fame Ratio : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].totalKills ? `**Total Kills : **${result[0].totalKills.toString()}` : "**Total Kills : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].gvgKills ? `**GVG Kills : **${result[0].gvgKills.toString()}` : "**GVG Kills : **Null",
                                            inline: false,
                                        },
                                        {
                                            name: ' ',
                                            value: result[0].gvgWon ? `**GVG Won : **${result[0].gvgWon.toString()}` : "**GVG Won : **Null",
                                            inline: false,
                                        },
                                    ])
                            ],
                        });  
                    } else {
                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                .setTitle('Albion Online Player Stats')
                                .setColor("Gold")
                                .setFooter({
                                text: "Made By Black-Rose Bot",
                                iconURL:
                                    "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                                })
                                .setTimestamp()
                                .setImage("https://cdn.discordapp.com/attachments/1068765395835699242/1138427848261128202/BLACKROSE.png")
                                .setDescription(`Username: ${name} \n Can't Find The Player In Albion Database`)
                            ],
                        });
                    }
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle('Albion Online Player Stats')
                    .setColor("Gold")
                    .setFooter({
                    text: "Made By Black-Rose Bot",
                    iconURL:
                        "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                    })
                    .setTimestamp()
                    .setImage("https://cdn.discordapp.com/attachments/1068765395835699242/1138427848261128202/BLACKROSE.png")
                    .setDescription('Please Type The Correct Server Name')
                ],
            });
        }
    },
};