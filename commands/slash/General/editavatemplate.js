const { EmbedBuilder } = require("discord.js");
const { DateTime } = require("luxon");
const initializeDatabase = require('../../../database/database');
const mongoose = initializeDatabase();

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
            description: "The field you want to edit (title, date, time, description, image, voicechanel)",
            type: 3,
            required: true
        },
        {
            name: "value",
            description: "The new value for the field",
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
        if (!message.embeds || message.embeds.length === 0 || !message.embeds[0].footer || message.embeds[0].footer.text !== "Made By Black-Rose Bot") {
            return interaction.reply("This message is not an AvA message.");
        }

        const originalEmbed = message.embeds[0];
        const originalTitle = originalEmbed.title;
        const originalDescription = originalEmbed.description;
        const originalImage = originalEmbed.image;
        const originalColor = originalEmbed.color;
        const originalFields = originalEmbed.fields;
        const newFields = [];
        for (let i = 0; i < originalFields.length; i++) {
            const field = originalFields[i];
            const name = field.name;
            const value = field.value;
            if (field.name === field) {
                if(!value){
                    value = "None";
                }
                if(value.length < 1){
                    value = "None";
                }
                value = value;
            }
            newFields.push({
                name,
                value,
                inline: field.inline,    
            });
        }       

        if (field === "title") {
            const embed = new EmbedBuilder()
            .setTitle(change)
            .setDescription(originalEmbed.description)
            .setColor(originalEmbed.color)
            .setFooter({
            text: "Made By Black-Rose Bot",
            iconURL:
            "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
            })
            .setImage(originalEmbed.url)
            .addFields(newFields);
                        
        } else if (field === "description") {
            
        } else if (field === "image") {
            
        } else if (field === "voicechanel") {
            
        } else if (field === "date" || field === "time") {

        } else {
            return interaction.reply("Invalid field. You can only edit the name, date, time, description, image, and voicechanel fields.");
        }

        // Send a confirmation message
        interaction.reply("The AvA message has been edited successfully.");
    },
};