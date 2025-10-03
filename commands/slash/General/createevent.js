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
    try {
      await interaction.deferReply({ ephemeral: true });

      const title = interaction.options.getString("title");
      const description = interaction.options.getString("description");
      const eventType = interaction.options.getString("type");
      const startTimeInput = interaction.options.getString("start_time");
      const maxAttendees = interaction.options.getInteger("max_attendees");

      if (title.length > 256) {
        return interaction.editReply({
          content: `The event title cannot exceed 256 characters. Your title is ${title.length} characters long.`,
        });
      }

      if (description.length > 4096) {
        return interaction.editReply({
          content: `The event description cannot exceed 4096 characters. Your description is ${description.length} characters long.`,
        });
      }

      const startTime = moment.tz(startTimeInput, "YYYY-MM-DD HH:mm", "Etc/UTC");

      if (!startTime.isValid()) {
        return interaction.editReply({
          content: "Invalid date format. Please use YYYY-MM-DD HH:MM.",
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
        .setFooter({ text: `Event created by ${interaction.user.username}` });

      const newEvent = new Event({
        guildId: interaction.guild.id,
        channelId: interaction.channelId,
        title,
        description,
        eventType,
        startTime: startTime.toDate(),
        maxAttendees,
        creator: interaction.user.id,
      });

      await newEvent.save();

      const message = await interaction.channel.send({ embeds: [eventEmbed] });

      newEvent.messageId = message.id;
      await newEvent.save();

      await Promise.all([
        message.react("✅"),
        message.react("❔"),
        message.react("❌"),
      ]);

      await interaction.editReply({
        content: "Event created successfully!",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({
          content: "An error occurred while creating the event. Please try again later.",
        });
      } else {
        await interaction.reply({
          content: "An error occurred while creating the event. Please try again later.",
          ephemeral: true,
        });
      }
    }
  },
};
