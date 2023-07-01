const { EmbedBuilder } = require("discord.js"); 

module.exports = {
  config: {
    name: "gautorole",
    description: "Albion Online Guild Auto Rank Role System",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    message.reply({ embeds: [
      new EmbedBuilder()
        .setDescription(`Ranking System is currently in development.`)
        .setColor("Green")
    ] })
    
  },
};
