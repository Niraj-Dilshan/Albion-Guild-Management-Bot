const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Bot Invitation Link",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle("Black-Rose-Bot Invitation Link")
                .setDescription("Click the link below to invite the bot to your server:\n[INVITE ME](https://discord.com/api/oauth2/authorize?client_id=1091594554437808138&permissions=8&scope=bot%20applications.commands)")
                .setColor("Gold")
                .setFooter({
                  text: "Made By INFINITY",
                  iconURL:
                    "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                })
                .setURL("https://discord.com/api/oauth2/authorize?client_id=1091594554437808138&permissions=8&scope=bot%20applications.commands")
            ],
            ephemeral: true
        })
    },
};
