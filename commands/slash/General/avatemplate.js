const { EmbedBuilder } = require("discord.js");
const { DateTime } = require("luxon");
const initializeDatabase = require("../../../database/database");
const mongoose = initializeDatabase();

const EMOJIS = {
  maintank: "918772807339474984",
  offtank: "1125035880541855825",
  greatarcane: "1125035859067023451",
  onehandarcane: "1125035868919443466",
  mainhealer: "1125035848841310258",
  ironroot: "1125035836723953766",
  shadowcaller: "1125035825512587274",
  realmbreaker: "1125035797767258213",
  earthrune: "1211671910266699827",
  chillhowl: "1125035788392988702",
  greatfire: "1125446279183486996",
  lightcaller: "1211672001874501632",
  xbow: "1125035778796441700",
  fillall: "1125430605677609033",
  scout: "1125430590116737056",
  absence: "1125430596794077255",
};

const ROLE_DISPLAY_NAMES = {
  maintank: "MainTank",
  offtank: "OffTank",
  greatarcane: "GreatArcane",
  onehandarcane: "OneHandArcane",
  mainhealer: "MainHealer",
  ironroot: "IronRoot",
  shadowcaller: "ShadowCaller",
  realmbreaker: "RealmBreaker",
  earthrune: "EarthRune",
  chillhowl: "Frost",
  greatfire: "Fire",
  lightcaller: "Lightcaller",
  xbow: "Xbow",
  fillall: "Fill All",
  scout: "Scout",
  absence: "Absence",
};

const EMOJI_NAMES = {
  maintank: "maintank",
  offtank: "offtank",
  greatarcane: "greatarcane",
  onehandarcane: "onehandarcane",
  mainhealer: "mainhealer",
  ironroot: "ironroot",
  shadowcaller: "shadowcaller",
  realmbreaker: "realmbreaker",
  earthrune: "Earthrune",
  chillhowl: "chillhowl",
  greatfire: "greatfire",
  lightcaller: "Lightcaller",
  xbow: "xbow",
  fillall: "fillall",
  scout: "scout",
  absence: "absence",
};

async function getAllReactionUsers(message) {
  const reactionUsers = {};
  const reactionCollection = message.reactions.cache;

  for (const [name, id] of Object.entries(EMOJIS)) {
    const reaction = reactionCollection.get(id);
    if (reaction) {
      const users = await reaction.users.fetch();
      reactionUsers[`${name}users`] = users
        .filter((user) => !user.bot)
        .map((user) => {
          const member = message.guild.members.cache.get(user.id);
          const displayName = member
            ? member.nickname || user.username
            : "Unknown User";
          return { id: user.id, name: displayName };
        });
    } else {
      reactionUsers[`${name}users`] = [];
    }
  }
  return reactionUsers;
}

async function updateEmbedWithReactions(embed, message) {
  const reactionUsers = await getAllReactionUsers(message);
  const newEmbed = new EmbedBuilder(embed.toJSON());

  const totalUsers = Object.values(reactionUsers).reduce(
    (sum, users) => sum + users.length,
    0
  );

  const totalField = newEmbed.data.fields.find((f) =>
    f.value.includes("<:total:1129625110605737994>")
  );
  if (totalField) {
    totalField.value = `<:total:1129625110605737994> ** ${totalUsers} **`;
  }

  for (const [roleName, emojiId] of Object.entries(EMOJIS)) {
    const users = reactionUsers[`${roleName}users`];
    const fieldToUpdate = newEmbed.data.fields.find((f) =>
      f.name.includes(`__**${ROLE_DISPLAY_NAMES[roleName]}**__`)
    );
    if (fieldToUpdate) {
      const userList =
        users
          .map((u) => `<:${EMOJI_NAMES[roleName]}:${emojiId}> ${u.name}`)
          .join("\n") || " ";
      fieldToUpdate.name = `<:${EMOJI_NAMES[roleName]}:${emojiId}> __**${ROLE_DISPLAY_NAMES[roleName]}**__(${users.length})`;
      fieldToUpdate.value = `${userList}\n\u200B`;
    }
  }
  return newEmbed;
}

module.exports = {
  name: "avatemplate",
  description: "Creates an AvA template!",
  type: 1,
  options: [
    {
      name: "name",
      description: "The name of the AvA",
      type: 3,
      required: true,
    },
    {
      name: "date",
      description: "The date for the AvA (YYYY-MM-DD)",
      type: 3,
      required: true,
    },
    {
      name: "time",
      description: "The time of the AvA in UTC 24 Hours Format (HH:MM)",
      type: 3,
      required: true,
    },
    {
      name: "description",
      description: "The description of the AvA",
      type: 3,
      required: true,
    },
    {
      name: "image",
      description: "image link for the AvA(URL)",
      type: 3,
      required: true,
    },
    {
      name: "voicechanel",
      description: "Voice chanel for the AvA",
      type: 3,
      required: true,
    },
  ],
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
  },
  run: async (client, interaction, config) => {
    const member = interaction.member;
    if (
      !config.Users.RAIDLEADERS.some((role) => member.roles.cache.has(role)) &&
      member.id !== config.Users.OWNERS
    ) {
      return interaction.reply(
        "Only raidleaders and the owner can execute this command."
      );
    }
    const guildid = interaction.guild.id;
    const name = interaction.options.getString("name");
    const date = interaction.options.getString("date");
    const time = interaction.options.getString("time");
    const descriptionInput = interaction.options.getString("description");
    const description = descriptionInput
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r");
    const image = interaction.options.getString("image");
    const voiceChannelName = interaction.options.getString("voicechanel");
    const raidleader = interaction.guild.members.cache.get(member.id);
    const raidleadername = raidleader
      ? raidleader.nickname || raidleader.user.username
      : "Unknown User";

    // Convert the provided date and time to a JavaScript Date object
    const dateTimeString = `${date} ${time}`;
    const selectedDate = DateTime.fromFormat(
      dateTimeString,
      "yyyy-MM-dd HH:mm"
    ).toJSDate();

    // Format the date and time using the previous JavaScript code
    const ts = selectedDate.getTime().toString();
    const timestampCode = `<t:${Math.floor(selectedDate.getTime() / 1000)}:R>`;
    const formattedDate = `<t:${Math.floor(selectedDate.getTime() / 1000)}:D>`;
    const formattedTime = `<t:${Math.floor(selectedDate.getTime() / 1000)}:t>`;

    const emojiarray = Object.values(EMOJIS);

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(name)
          .setDescription(`${description}`)
          .setColor("Gold")
          .setFooter({
            text: "Made By INFINITY",
            iconURL:
              "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
          })
          .setTimestamp()
          .setImage(image)
          .addFields([
            {
              name: "\u200E",
              value: `🛡️ ${raidleadername}`,
              inline: true,
            },
            {
              name: "\u200E",
              value: "<:total:1129625110605737994> ** 0 **",
              inline: true,
            },
            {
              name: "\u200E",
              value: `🔊 ${voiceChannelName}`,
              inline: true,
            },
            {
              name: "\u200B",
              value: `🗓️ ${formattedDate}`,
              inline: true,
            },
            {
              name: "\u200C",
              value: `⏰ ${formattedTime}`,
              inline: true,
            },
            {
              name: "\u200D",
              value: `⌛ ${timestampCode}\n\u200B`,
              inline: true,
            },
            {
              name: `<:maintank:${EMOJIS.maintank}> __**MainTank**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:offtank:${EMOJIS.offtank}> __**OffTank**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:mainhealer:${EMOJIS.mainhealer}> __**MainHealer**__(0)`,
              value: "\n\u200B",
              inline: true,
            },
            {
              name: `<:greatarcane:${EMOJIS.greatarcane}> __**GreatArcane**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:onehandarcane:${EMOJIS.onehandarcane}> __**OneHandArcane**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: " ",
              value: " ",
              inline: false,
            },
            {
              name: `<:ironroot:${EMOJIS.ironroot}> __**IronRoot**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:shadowcaller:${EMOJIS.shadowcaller}> __**ShadowCaller**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:realmbreaker:${EMOJIS.realmbreaker}> __**RealmBreaker**__(0)`,
              value: "\n\u200B",
              inline: true,
            },
            {
              name: `<:Earthrune:${EMOJIS.earthrune}> __**EarthRune**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:chillhowl:${EMOJIS.chillhowl}> __**Frost**__(0)`,
              value: "\n\u200B",
              inline: true,
            },
            {
              name: `<:greatfire:${EMOJIS.greatfire}> __**Fire**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:Lightcaller:${EMOJIS.lightcaller}>  __**Lightcaller**__(0)`,
              value: "\n\u200B",
              inline: true,
            },
            {
              name: `<:xbow:${EMOJIS.xbow}>  __**Xbow**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:fillall:${EMOJIS.fillall}> __**Fill All**__(0)`,
              value: " ",
              inline: true,
            },
            {
              name: `<:scout:${EMOJIS.scout}> __**Scout**__(0)`,
              value: "\n\u200B",
              inline: true,
            },
            {
              name: `<:absence:${EMOJIS.absence}> __**Absence**__(0)`,
              value: "\n\u200B",
              inline: false,
            },
          ]),
      ],
    });

    const message = await interaction.fetchReply();
    const channelId = interaction.channel.id;
    const db = mongoose.connection.useDb("AvaRaids");
    const dbmodel = db.model(
      "AvaRaids",
      new mongoose.Schema({
        messageId: String,
        channelId: String,
        selectedDate: Date,
      })
    );
    await dbmodel.create({
      messageId: message.id,
      channelId: channelId,
      selectedDate: selectedDate,
    });

    for (const emoji of emojiarray) {
      message.react(emoji);
    }
  },
};

module.exports.fetchReactions = async function (message) {
  try {
    // Fetch the message to ensure all properties are available
    await message.fetch();

    const originalEmbed = message.embeds[0];
    const newEmbed = await updateEmbedWithReactions(originalEmbed, message);

    await message.edit({ embeds: [newEmbed] });
  } catch (error) {
    console.error("Something went wrong when fetching the message:", error);
    // Return as `message.author` may be undefined/null
    return;
  }
};

module.exports.updatetemplate = async function (
  message,
  fieldname,
  fieldvalue
) {
  try {
    // Fetch the message to ensure all properties are available
    await message.fetch();

    const originalEmbed = message.embeds[0];
    const mutableEmbed = new EmbedBuilder(originalEmbed.toJSON());

    if (fieldname === "title") {
      mutableEmbed.setTitle(fieldvalue);
    } else if (fieldname === "description") {
      const description = fieldvalue
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r");
      mutableEmbed.setDescription(description);
    } else if (fieldname === "image") {
      mutableEmbed.setImage(fieldvalue);
    } else if (fieldname === "date-time") {
      const dateTimeString = `${fieldvalue}`;
      const selectedDate = DateTime.fromFormat(
        dateTimeString,
        "yyyy-MM-dd HH:mm"
      ).toJSDate();
      // Format the date and time using the previous JavaScript code
      const timestampCode = `<t:${Math.floor(
        selectedDate.getTime() / 1000
      )}:R>`;
      const formattedDate = `<t:${Math.floor(
        selectedDate.getTime() / 1000
      )}:D>`;
      const formattedTime = `<t:${Math.floor(
        selectedDate.getTime() / 1000
      )}:t>`;

      mutableEmbed.spliceFields(3, 3, [
        {
          name: "\u200B",
          value: `🗓️ ${formattedDate}`,
          inline: true,
        },
        {
          name: "\u200C",
          value: `⏰ ${formattedTime}`,
          inline: true,
        },
        {
          name: "\u200D",
          value: `⌛ ${timestampCode}\n\u200B`,
          inline: true,
        },
      ]);

      //update mongodb
      const db = mongoose.connection.useDb("AvaRaids");
      const dbmodel = db.model(
        "AvaRaids",
        new mongoose.Schema({
          messageId: String,
          channelId: String,
          selectedDate: Date,
        })
      );
      await dbmodel.updateOne(
        {
          messageId: message.id,
        },
        {
          $set: {
            selectedDate: selectedDate,
          },
        },
        {
          upsert: true,
        }
      );
    }

    const finalEmbed = await updateEmbedWithReactions(mutableEmbed, message);

    await message.edit({
      embeds: [finalEmbed],
    });
  } catch (error) {
    console.error("Something went wrong when updating the template:", error);
    // Return as `message.author` may be undefined/null
    return;
  }
};
