const { EmbedBuilder } = require("discord.js");
const Event = require('../../database/models/Event');
const moment = require('moment-timezone');

module.exports = {
  name: "createevent",
  description: "Create a new guild event",
  type: 1,
  options: [
    {
      name: "title",
      description: "The title of the event",
      type: 3,
      required: true,
    },
    {
        name: "description",
        description: "The description of the event",
        type: 3,
        required: true,
    },
    {
        name: "type",
        description: "The type of event",
        type: 3,
        required: true,
        choices: [
            {
                name: "ZvZ",
                value: "ZvZ"
            },
            {
                name: "Fame Farm",
                value: "Fame Farm"
            },
            {
                name: "Gank",
                value: "Gank"
            }
        ]
    },
    {
        name: "start_time",
        description: "The start time of the event (e.g., 'YYYY-MM-DD HH:MM')",
        type: 3,
        required: true,
    },
    {
        name: "max_attendees",
        description: "The maximum number of attendees",
        type: 4,
        required: true,
    }
  ],
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
  },
  run: async (client, interaction, config, db) => {
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const eventType = interaction.options.getString("type");
    const startTimeInput = interaction.options.getString("start_time");
    const maxAttendees = interaction.options.getInteger("max_attendees");

    const startTime = moment.tz(startTimeInput, "YYYY-MM-DD HH:mm", "Etc/UTC");

    if (!startTime.isValid()) {
        return interaction.reply({
            content: "Invalid date format. Please use YYYY-MM-DD HH:MM.",
            ephemeral: true,
        });
    }

    const eventEmbed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor("Blue")
      .addFields(
        { name: "Event Type", value: eventType, inline: true },
        { name: "Start Time", value: `<t:${startTime.unix()}:F>`, inline: true },
        { name: "Max Attendees", value: maxAttendees.toString(), inline: true },
        { name: "✅ Attendees (0)", value: "None", inline: false },
        { name: "❔ Maybes (0)", value: "None", inline: false },
        { name: "❌ Declined (0)", value: "None", inline: false }
      )
      .setFooter({ text: `Event created by ${interaction.user.username}`});

    const message = await interaction.channel.send({ embeds: [eventEmbed] });

    await message.react("✅");
    await message.react("❔");
    await message.react("❌");

    const newEvent = new Event({
        guildId: interaction.guild.id,
        messageId: message.id,
        title,
        description,
        eventType,
        startTime: startTime.toDate(),
        maxAttendees,
        creator: interaction.user.id,
    });

    await newEvent.save();

    interaction.reply({
        content: "Event created successfully!",
        ephemeral: true,
    });
  },
};
