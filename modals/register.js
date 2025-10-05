const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const initializeDatabase = require("../database/database");
const mongoose = initializeDatabase();

module.exports = {
  id: "guildRegister",
  run: async (client, interaction, config) => {
    const name = interaction.fields.getTextInputValue("username");
    const discordName = interaction.member.user.username;
    const guildid = interaction.guild.id;
    const guildname = interaction.guild.name;
    const db = mongoose.connection.useDb(guildid);
    const dbmodel = db.model(
      "User",
      new mongoose.Schema({
        discordId: String,
        discordName: String,
        albionId: String,
        albionName: String,
        guildName: String,
      })
    );
    await axios
      .get(
        `https://gameinfo-sgp.albiononline.com/api/gameinfo/search?q=${name}`
      )
      .then(async (res) => {
        const result = res.data.players.filter((obj) => obj.Name === name);
        if (result.length > 0) {
          await interaction.member.setNickname(name);
          await interaction.reply({
            embeds: [
              new EmbedBuilder().setDescription(
                `Username: ${name} Has Been Successfully Registered`
              ),
            ],
            ephemeral: true,
          });
          const user = await dbmodel.findOne({
            discordId: interaction.member.id,
          });
          if (user) {
            await dbmodel.updateOne(
              { discordId: interaction.member.id },
              {
                discordName: discordName,
                albionId: result[0].Id,
                albionName: name,
                guildName: guildname,
              }
            );
          } else {
            await dbmodel.create({
              discordId: interaction.member.id,
              discordName: discordName,
              albionId: result[0].Id,
              albionName: name,
              guildName: guildname,
            });
          }
          // Auto-assign registered role if configured
          try {
            const roleId = config.Roles && config.Roles.REGISTERED_ROLE;
            if (roleId) {
              const role = interaction.guild.roles.cache.get(roleId);
              if (!role) {
                console.log(`Configured registered role ID ${roleId} not found in guild ${guildid}`);
              } else {
                // Check bot permissions and role hierarchy
                const botMember = interaction.guild.members.me || interaction.guild.members.cache.get(client.user.id);
                if (!botMember) {
                  console.log('Bot member object not found when attempting to assign registered role.');
                } else if (!botMember.permissions.has('ManageRoles')) {
                  console.log('Bot lacks Manage Roles permission, cannot assign registered role.');
                } else if (role.position >= botMember.roles.highest.position) {
                  console.log('Configured role is higher or equal to bot highest role, cannot assign.');
                } else {
                  await interaction.member.roles.add(roleId).catch(err => console.log('Failed to add registered role:', err));
                }
              }
            }
          } catch (err) {
            console.log('Error while assigning registered role:', err);
          }
        } else {
          await interaction.reply({
            embeds: [
              new EmbedBuilder().setDescription(
                `Username: ${name} \n Can't Find The Player In Albion Database`
              ),
            ],
            ephemeral: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
