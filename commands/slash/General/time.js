const { MessageEmbed } = require("discord.js");
const moment = require("moment-timezone");

module.exports = {
  name: "time",
  description:
    "Replies with the current server time or time in a specified timezone",
  type: 1,
  options: [
    {
      name: "timezone",
      description: "The timezone to get the time for",
      type: 3, // 3 is a STRING type
      required: false, // make it optional
    },
  ],
  permissions: {
    default_member_permissions: "sendmessages",
  },
  run: async (client, interaction, config, db) => {
    const timezone = interaction.options.getString("timezone");
    let currentTime;

    if (timezone) {
      currentTime = moment().tz(timezone).format("MMMM Do YYYY, h:mm:ss a z");
    } else {
      currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    }

    const timeEmbed = new MessageEmbed()
      .setDescription(`Current time: ${currentTime}`)
      .setColor("blue");

    return interaction.reply({
      embeds: [timeEmbed],
      ephemeral: true,
    });
  },
};
