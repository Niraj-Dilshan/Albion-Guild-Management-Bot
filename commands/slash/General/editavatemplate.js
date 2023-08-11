const { EmbedBuilder } = require("discord.js");
const { updatetemplate } = require("./avatemplate");

module.exports = {
    name: "editava",
    description: "Edits an AvA template!",
    type: 1,
    options: [
        {
            name: "messageid",
            description: "The ID of the AvA message you want to edit",
            type: 3,
            required: true
        },
        {
            name: "field",
            description: "The field you want to edit (title, date-time, description, image)",
            type: 3,
            required: true
        },
        {
            name: "value",
            description: "The new value for the field (Date and Time must be in the format: YYYY-MM-dd HH:MM (24 hour format))",
            type: 3,
            required: true
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config) => {        
        const member = interaction.member;
        if (!config.Users.RAIDLEADERS.some(role => member.roles.cache.has(role)) && member.id !== config.Users.OWNERS) {
            return interaction.reply("Only raidleaders and the owner can execute this command.");
        }

        const messageId = interaction.options.getString("messageid");
        const field = interaction.options.getString("field").toLowerCase();
        const change = interaction.options.getString("value");

        // Fetch the message
        const channel = interaction.channel;
        const message = await channel.messages.fetch(messageId);

        // Ensure this is an AvA message
        if (!message.embeds || message.embeds.length === 0 || !message.embeds[0].footer || message.embeds[0].footer.text !== "Made By INFINITY") {
            return interaction.reply("This message is not an AvA message.");
        }
        updatetemplate(message, field, change);
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("Updated the AvA message!")
                    .setColor('#d000ff')
            ],
            ephemeral: true
        })
    },
};