const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avatemplate",
    description: "Creates an AvA template!",
    type: 1,
    options: [
        {
            name: "name",
            description: "The name of the AvA",
            type: 3,
            required: true
        },
        {
            name: "date",
            description: "The date for the AvA (YYYY-MM-DD)",
            type: 3,
            required: true
        },
        {
            name: "time",
            description: "The time of the AvA in UTC 24 Hours Format (HH:MM AM/PM)",
            type: 3,
            required: true
        },
        {
            name: "description",
            description: "The description of the AvA",
            type: 3,
            required: true
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
        ROLES: [1068816615862440016]
    },
    run: async (client, interaction, config, db) => {
        const member = interaction.member;
        if (!member.roles.cache.has('1068816615862440016')) {
            return interaction.reply("Only raidleaders can execute this command.");
        }
        const name = interaction.options.getString("name");
        const data = interaction.options.getString("date");
        const time = interaction.options.getString("time");
        const description = interaction.options.getString("description");

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Name: ${name}\nData: ${data}\nTime: ${time}\nDescription: ${description}`)
                    .setColor('Blue')
            ],
            ephemeral: true
        })
    },
};