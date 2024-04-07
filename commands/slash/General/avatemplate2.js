const { EmbedBuilder } = require("discord.js");
const { DateTime } = require("luxon");
const initializeDatabase = require("../../../database/database");
const mongoose = initializeDatabase();

module.exports = {
  name: "avatemplatetenman",
  description: "Creates then man AvA template!",
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

    // declare emojis
    const maintankemoji = "918772807339474984";
    const offtankemoji = "1125035880541855825";
    const greatarcaneemoji = "1125035859067023451";
    const onehandarcaneemoji = "1125035868919443466";
    const mainhealeremoji = "1125035848841310258";
    const ironrootemoji = "1125035836723953766";
    const shadowcalleremoji = "1125035825512587274";
    const weepingemoji = "1222540055462019302";
    const blazingemoji = "1125035751722209310";
    const chillhowlemoji = "1125035788392988702";
    const lightcalleremoji = "1211672001874501632";
    const fillallemoji = "1125430605677609033";
    const scoutemoji = "1125430590116737056";
    const absenceemoji = "1125430596794077255";

    const emojiarray = [
      maintankemoji,
      offtankemoji,
      mainhealeremoji,
      greatarcaneemoji,
      onehandarcaneemoji,
      ironrootemoji,
      shadowcalleremoji,
      weepingemoji,
      blazingemoji,
      chillhowlemoji,
      lightcalleremoji,
      fillallemoji,
      scoutemoji,
      absenceemoji,
    ];

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
              name: "<:maintank:918772807339474984> __**MainTank**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:offtank:1125035880541855825> __**OffTank**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:mainhealer:1125035848841310258> __**MainHealer**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:greatarcane:1125035859067023451> __**GreatArcane**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:onehandarcane:1125035868919443466> __**OneHandArcane**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: " ",
              value: " ",
              inline: false,
            },
            {
              name: "<:ironroot:1125035836723953766> __**IronRoot**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:shadowcaller:1125035825512587274> __**ShadowCaller**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:Weeping:1222540055462019302> __**RealmBreaker**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:Blazing:1125035751722209310> __**EarthRune**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:chillhowl:1125035788392988702> __**Frost**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:Lightcaller:1211672001874501632>  __**Lightcaller**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:fillall:1125430605677609033> __**Fill All**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:scout:1125430590116737056> __**Scout**__(0)",
              value: "\n\u200B",
              inline: true,
            },
            {
              name: "<:absence:1125430596794077255> __**Absence**__(0)",
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

module.exports.fetchReactions2 = async function (message) {
  try {
    // Fetch the message to ensure all properties are available
    await message.fetch();

    // declare emojis
    const maintankemoji = "918772807339474984";
    const offtankemoji = "1125035880541855825";
    const greatarcaneemoji = "1125035859067023451";
    const onehandarcaneemoji = "1125035868919443466";
    const mainhealeremoji = "1125035848841310258";
    const ironrootemoji = "1125035836723953766";
    const shadowcalleremoji = "1125035825512587274";
    const weepingemoji = "1222540055462019302";
    const blazingemoji = "1125035751722209310";
    const chillhowlemoji = "1125035788392988702";
    const lightcalleremoji = "1211672001874501632";
    const fillallemoji = "1125430605677609033";
    const scoutemoji = "1125430590116737056";
    const absenceemoji = "1125430596794077255";

    // Declare the user arrays
    let maintankusers = [];
    let offtankusers = [];
    let greatarcaneusers = [];
    let onehandarcaneusers = [];
    let mainhealerusers = [];
    let ironrootusers = [];
    let shadowcallerusers = [];
    let realmbreakerusers = [];
    let earthruneusers = [];
    let chillhowleusers = [];
    let lightcallerusers = [];
    let fillallusers = [];
    let scoutusers = [];
    let absenceusers = [];

    // Get the reaction collection
    const reactionCollection = message.reactions.cache;

    if (reactionCollection.has(maintankemoji)) {
      const maintankReaction = reactionCollection.get(maintankemoji);
      const maintankUserIds = (await maintankReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      maintankusers = maintankUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(offtankemoji)) {
      const offtankReaction = reactionCollection.get(offtankemoji);
      const offtankUserIds = (await offtankReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      offtankusers = offtankUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(greatarcaneemoji)) {
      const greatarcaneReaction = reactionCollection.get(greatarcaneemoji);
      const greatarcaneUserIds = (await greatarcaneReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      greatarcaneusers = greatarcaneUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(onehandarcaneemoji)) {
      const onehandarcaneReaction = reactionCollection.get(onehandarcaneemoji);
      const onehandarcaneUserIds = (await onehandarcaneReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      onehandarcaneusers = onehandarcaneUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(mainhealeremoji)) {
      const mainhealerReaction = reactionCollection.get(mainhealeremoji);
      const mainhealerUserIds = (await mainhealerReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      mainhealerusers = mainhealerUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(ironrootemoji)) {
      const ironrootReaction = reactionCollection.get(ironrootemoji);
      const ironrootUserIds = (await ironrootReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      ironrootusers = ironrootUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(shadowcalleremoji)) {
      const shadowcallerReaction = reactionCollection.get(shadowcalleremoji);
      const shadowcallerUserIds = (await shadowcallerReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      shadowcallerusers = shadowcallerUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(weepingemoji)) {
      const realmbreakerReaction = reactionCollection.get(weepingemoji);
      const realmbreakerUserIds = (await realmbreakerReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      realmbreakerusers = realmbreakerUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(blazingemoji)) {
      const earthruneReaction = reactionCollection.get(blazingemoji);
      const earthruneUserIds = (await earthruneReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      earthruneusers = earthruneUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(chillhowlemoji)) {
      const chillhowlReaction = reactionCollection.get(chillhowlemoji);
      const chillhowlUserIds = (await chillhowlReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      chillhowleusers = chillhowlUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(lightcalleremoji)) {
      const lightcallerReaction = reactionCollection.get(lightcalleremoji);
      const lightcallerUserIds = (await lightcallerReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      lightcallerusers = lightcallerUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(fillallemoji)) {
      const fillallReaction = reactionCollection.get(fillallemoji);
      const fillallUserIds = (await fillallReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      fillallusers = fillallUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(scoutemoji)) {
      const scoutReaction = reactionCollection.get(scoutemoji);
      const scoutUserIds = (await scoutReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      scoutusers = scoutUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(absenceemoji)) {
      const absenceReaction = reactionCollection.get(absenceemoji);
      const absenceUserIds = (await absenceReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      absenceusers = absenceUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }

    const originalEmbed = message.embeds[0];
    const originalTitle = originalEmbed.title;
    const originalDescription = originalEmbed.description;
    const originalImage = originalEmbed.image;
    const originalColor = originalEmbed.color;
    const originalFields = originalEmbed.fields;
    const originalRaidleadername = originalFields[0].value;
    const originalVoiceChannelName = originalFields[2].value;
    const originalCalendarValue = originalFields[3].value;
    const originalClockValue = originalFields[4].value;
    const originalHourglassValue = originalFields[5].value;

    // Update the embed with the new reaction counts
    message.edit({
      embeds: [
        new EmbedBuilder()
          .setTitle(originalTitle)
          .setDescription(originalDescription)
          .setColor(originalColor)
          .setFooter({
            text: "Made By INFINITY",
            iconURL:
              "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
          })
          .setTimestamp()
          .setImage(originalImage.url)
          .addFields([
            {
              name: " ",
              value: originalRaidleadername,
              inline: true,
            },
            {
              name: " ",
              value: `<:total:1129625110605737994> ** ${
                maintankusers.length +
                offtankusers.length +
                greatarcaneusers.length +
                onehandarcaneusers.length +
                mainhealerusers.length +
                ironrootusers.length +
                shadowcallerusers.length +
                realmbreakerusers.length +
                earthruneusers.length +
                chillhowleusers.length +
                lightcallerusers.length +
                fillallusers.length +
                scoutusers.length
              } **`,
              inline: true,
            },
            {
              name: " ",
              value: originalVoiceChannelName,
              inline: true,
            },
            {
              name: " ",
              value: originalCalendarValue,
              inline: true,
            },
            {
              name: " ",
              value: originalClockValue,
              inline: true,
            },
            {
              name: " ",
              value: originalHourglassValue,
              inline: true,
            },
            {
              name: `<:maintank:918772807339474984> __**MainTank**__(${maintankusers.length})`,
              value: ` ${maintankusers
                .map((user) => "<:maintank:918772807339474984> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:offtank:1125035880541855825> __**OffTank**__(${offtankusers.length})`,
              value: ` ${offtankusers
                .map((user) => "<:offtank:1125035880541855825> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:mainhealer:1125035848841310258> __**MainHealer**__(${mainhealerusers.length})`,
              value: `  ${mainhealerusers
                .map((user) => "<:mainhealer:1125035848841310258> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:greatarcane:1125035859067023451> __**GreatArcane**__(${greatarcaneusers.length})`,
              value: `  ${greatarcaneusers
                .map(
                  (user) => "<:greatarcane:1125035859067023451> " + user.name
                )
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:onehandarcane:1125035868919443466> __**OneHandArcane**__(${onehandarcaneusers.length})`,
              value: ` ${onehandarcaneusers
                .map(
                  (user) => "<:onehandarcane:1125035868919443466> " + user.name
                )
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: " ",
              value: " ",
              inline: false,
            },
            {
              name: `<:ironroot:1125035836723953766> __**IronRoot**__(${ironrootusers.length})`,
              value: `  ${ironrootusers
                .map((user) => "<:ironroot:1125035836723953766> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:shadowcaller:1125035825512587274> __**ShadowCaller**__(${shadowcallerusers.length})`,
              value: ` ${shadowcallerusers
                .map(
                  (user) => "<:shadowcaller:1125035825512587274> " + user.name
                )
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:Weeping:1222540055462019302> __**RealmBreaker**__(${realmbreakerusers.length})`,
              value: ` ${realmbreakerusers
                .map(
                  (user) => "<:Weeping:1222540055462019302> " + user.name
                )
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:Blazing:1125035751722209310> __**EarthRune**__(${earthruneusers.length})`,
              value: ` ${earthruneusers
                .map((user) => "<:Blazing:1125035751722209310> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:chillhowl:1125035788392988702> __**Frost**__(${chillhowleusers.length})`,
              value: ` ${chillhowleusers
                .map((user) => "<:chillhowl:1125035788392988702> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:Lightcaller:1211672001874501632>  __**Lightcaller**__(${lightcallerusers.length})`,
              value: ` ${lightcallerusers
                .map((user) => "<:Lightcaller:1211672001874501632> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:fillall:1125430605677609033> __**Fill All**__(${fillallusers.length})`,
              value: ` ${fillallusers
                .map((user) => "<:fillall:1125430605677609033> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:scout:1125430590116737056> __**Scout**__(${scoutusers.length})`,
              value: ` ${scoutusers
                .map((user) => "<:scout:1125430590116737056> " + user.name)
                .join("\n")} \n\u200B`,
              inline: true,
            },
            {
              name: `<:absence:1125430596794077255> __**Absence**__(${absenceusers.length})`,
              value: ` ${absenceusers
                .map((user) => "<:absence:1125430596794077255> " + user.name)
                .join("\n")} \n\u200B`,
              inline: false,
            },
          ]),
      ],
    });
  } catch (error) {
    console.error("Something went wrong when fetching the message:", error);
    // Return as `message.author` may be undefined/null
    return;
  }
};

module.exports.updatetemplate2 = async function (
  message,
  fieldname,
  fieldvalue
) {
  try {
    // Fetch the message to ensure all properties are available
    await message.fetch();

    // declare emojis
    const maintankemoji = "918772807339474984";
    const offtankemoji = "1125035880541855825";
    const greatarcaneemoji = "1125035859067023451";
    const onehandarcaneemoji = "1125035868919443466";
    const mainhealeremoji = "1125035848841310258";
    const ironrootemoji = "1125035836723953766";
    const shadowcalleremoji = "1125035825512587274";
    const weepingemoji = "1222540055462019302";
    const blazingemoji = "1125035751722209310";
    const chillhowlemoji = "1125035788392988702";
    const lightcalleremoji = "1211672001874501632";
    const fillallemoji = "1125430605677609033";
    const scoutemoji = "1125430590116737056";
    const absenceemoji = "1125430596794077255";

    // Declare the user arrays
    let maintankusers = [];
    let offtankusers = [];
    let greatarcaneusers = [];
    let onehandarcaneusers = [];
    let mainhealerusers = [];
    let ironrootusers = [];
    let shadowcallerusers = [];
    let realmbreakerusers = [];
    let earthruneusers = [];
    let chillhowleusers = [];
    let lightcallerusers = [];
    let fillallusers = [];
    let scoutusers = [];
    let absenceusers = [];

    // Get the reaction collection
    const reactionCollection = message.reactions.cache;

    if (reactionCollection.has(maintankemoji)) {
      const maintankReaction = reactionCollection.get(maintankemoji);
      const maintankUserIds = (await maintankReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      maintankusers = maintankUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(offtankemoji)) {
      const offtankReaction = reactionCollection.get(offtankemoji);
      const offtankUserIds = (await offtankReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      offtankusers = offtankUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(greatarcaneemoji)) {
      const greatarcaneReaction = reactionCollection.get(greatarcaneemoji);
      const greatarcaneUserIds = (await greatarcaneReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      greatarcaneusers = greatarcaneUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(onehandarcaneemoji)) {
      const onehandarcaneReaction = reactionCollection.get(onehandarcaneemoji);
      const onehandarcaneUserIds = (await onehandarcaneReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      onehandarcaneusers = onehandarcaneUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(mainhealeremoji)) {
      const mainhealerReaction = reactionCollection.get(mainhealeremoji);
      const mainhealerUserIds = (await mainhealerReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      mainhealerusers = mainhealerUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(ironrootemoji)) {
      const ironrootReaction = reactionCollection.get(ironrootemoji);
      const ironrootUserIds = (await ironrootReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      ironrootusers = ironrootUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(shadowcalleremoji)) {
      const shadowcallerReaction = reactionCollection.get(shadowcalleremoji);
      const shadowcallerUserIds = (await shadowcallerReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      shadowcallerusers = shadowcallerUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(weepingemoji)) {
      const realmbreakerReaction = reactionCollection.get(weepingemoji);
      const realmbreakerUserIds = (await realmbreakerReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      realmbreakerusers = realmbreakerUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(blazingemoji)) {
      const earthruneReaction = reactionCollection.get(blazingemoji);
      const earthruneUserIds = (await earthruneReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      earthruneusers = earthruneUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(chillhowlemoji)) {
      const chillhowlReaction = reactionCollection.get(chillhowlemoji);
      const chillhowlUserIds = (await chillhowlReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      chillhowleusers = chillhowlUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(lightcalleremoji)) {
      const lightcallerReaction = reactionCollection.get(lightcalleremoji);
      const lightcallerUserIds = (await lightcallerReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      lightcallerusers = lightcallerUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(fillallemoji)) {
      const fillallReaction = reactionCollection.get(fillallemoji);
      const fillallUserIds = (await fillallReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      fillallusers = fillallUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(scoutemoji)) {
      const scoutReaction = reactionCollection.get(scoutemoji);
      const scoutUserIds = (await scoutReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      scoutusers = scoutUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }
    if (reactionCollection.has(absenceemoji)) {
      const absenceReaction = reactionCollection.get(absenceemoji);
      const absenceUserIds = (await absenceReaction.users.fetch())
        .filter((user) => !user.bot)
        .map((user) => user.id);

      // Fetch server nicknames for the users
      absenceusers = absenceUserIds.map((userId) => {
        const member = message.guild.members.cache.get(userId);
        const displayName = member
          ? member.nickname || member.user.username
          : "Unknown User";
        return { id: userId, name: displayName };
      });
    }

    const originalEmbed = message.embeds[0];
    const originalTitle = originalEmbed.title;
    const originalDescription = originalEmbed.description;
    const originalImage = originalEmbed.image;
    const originalColor = originalEmbed.color;
    const originalFields = originalEmbed.fields;
    const originalRaidleadername = originalFields[0].value;
    const originalVoiceChannelName = originalFields[2].value;
    const originalCalendarValue = originalFields[3].value;
    const originalClockValue = originalFields[4].value;
    const originalHourglassValue = originalFields[5].value;

    if (fieldname == "title") {
      message.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle(fieldvalue)
            .setDescription(originalDescription)
            .setColor(originalColor)
            .setFooter({
              text: "Made By INFINITY",
              iconURL:
                "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
            })
            .setTimestamp()
            .setImage(originalImage.url)
            .addFields([
              {
                name: " ",
                value: originalRaidleadername,
                inline: true,
              },
              {
                name: " ",
                value: `<:total:1129625110605737994> ** ${
                  maintankusers.length +
                  offtankusers.length +
                  greatarcaneusers.length +
                  onehandarcaneusers.length +
                  mainhealerusers.length +
                  ironrootusers.length +
                  shadowcallerusers.length +
                  realmbreakerusers.length +
                  earthruneusers.length +
                  chillhowleusers.length +
                  lightcallerusers.length +
                  fillallusers.length +
                  scoutusers.length
                } **`,
                inline: true,
              },
              {
                name: " ",
                value: originalVoiceChannelName,
                inline: true,
              },
              {
                name: " ",
                value: originalCalendarValue,
                inline: true,
              },
              {
                name: " ",
                value: originalClockValue,
                inline: true,
              },
              {
                name: " ",
                value: originalHourglassValue,
                inline: true,
              },
              {
                name: `<:maintank:918772807339474984> __**MainTank**__(${maintankusers.length})`,
                value: ` ${maintankusers
                  .map((user) => "<:maintank:918772807339474984> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:offtank:1125035880541855825> __**OffTank**__(${offtankusers.length})`,
                value: ` ${offtankusers
                  .map((user) => "<:offtank:1125035880541855825> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:mainhealer:1125035848841310258> __**MainHealer**__(${mainhealerusers.length})`,
                value: `  ${mainhealerusers
                  .map(
                    (user) => "<:mainhealer:1125035848841310258> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:greatarcane:1125035859067023451> __**GreatArcane**__(${greatarcaneusers.length})`,
                value: `  ${greatarcaneusers
                  .map(
                    (user) => "<:greatarcane:1125035859067023451> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:onehandarcane:1125035868919443466> __**OneHandArcane**__(${onehandarcaneusers.length})`,
                value: ` ${onehandarcaneusers
                  .map(
                    (user) =>
                      "<:onehandarcane:1125035868919443466> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: " ",
                value: " ",
                inline: false,
              },
              {
                name: `<:ironroot:1125035836723953766> __**IronRoot**__(${ironrootusers.length})`,
                value: `  ${ironrootusers
                  .map((user) => "<:ironroot:1125035836723953766> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:shadowcaller:1125035825512587274> __**ShadowCaller**__(${shadowcallerusers.length})`,
                value: ` ${shadowcallerusers
                  .map(
                    (user) => "<:shadowcaller:1125035825512587274> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Weeping:1222540055462019302> __**RealmBreaker**__(${realmbreakerusers.length})`,
                value: ` ${realmbreakerusers
                  .map(
                    (user) => "<:Weeping:1222540055462019302> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Blazing:1125035751722209310> __**EarthRune**__(${earthruneusers.length})`,
                value: ` ${earthruneusers
                  .map((user) => "<:Blazing:1125035751722209310> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:chillhowl:1125035788392988702> __**Frost**__(${chillhowleusers.length})`,
                value: ` ${chillhowleusers
                  .map(
                    (user) => "<:chillhowl:1125035788392988702> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Lightcaller:1211672001874501632>  __**Lightcaller**__(${lightcallerusers.length})`,
                value: ` ${lightcallerusers
                  .map((user) => "<:Lightcaller:1211672001874501632> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:fillall:1125430605677609033> __**Fill All**__(${fillallusers.length})`,
                value: ` ${fillallusers
                  .map((user) => "<:fillall:1125430605677609033> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:scout:1125430590116737056> __**Scout**__(${scoutusers.length})`,
                value: ` ${scoutusers
                  .map((user) => "<:scout:1125430590116737056> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:absence:1125430596794077255> __**Absence**__(${absenceusers.length})`,
                value: ` ${absenceusers
                  .map((user) => "<:absence:1125430596794077255> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: false,
              },
            ]),
        ],
      });
    }
    if (fieldname == "description") {
      const description = fieldvalue
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r");
      message.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle(originalTitle)
            .setDescription(description)
            .setColor(originalColor)
            .setFooter({
              text: "Made By INFINITY",
              iconURL:
                "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
            })
            .setTimestamp()
            .setImage(originalImage.url)
            .addFields([
              {
                name: " ",
                value: originalRaidleadername,
                inline: true,
              },
              {
                name: " ",
                value: `<:total:1129625110605737994> ** ${
                  maintankusers.length +
                  offtankusers.length +
                  greatarcaneusers.length +
                  onehandarcaneusers.length +
                  mainhealerusers.length +
                  ironrootusers.length +
                  shadowcallerusers.length +
                  realmbreakerusers.length +
                  earthruneusers.length +
                  chillhowleusers.length +
                  lightcallerusers.length +
                  fillallusers.length +
                  scoutusers.length
                } **`,
                inline: true,
              },
              {
                name: " ",
                value: originalVoiceChannelName,
                inline: true,
              },
              {
                name: " ",
                value: originalCalendarValue,
                inline: true,
              },
              {
                name: " ",
                value: originalClockValue,
                inline: true,
              },
              {
                name: " ",
                value: originalHourglassValue,
                inline: true,
              },
              {
                name: `<:maintank:918772807339474984> __**MainTank**__(${maintankusers.length})`,
                value: ` ${maintankusers
                  .map((user) => "<:maintank:918772807339474984> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:offtank:1125035880541855825> __**OffTank**__(${offtankusers.length})`,
                value: ` ${offtankusers
                  .map((user) => "<:offtank:1125035880541855825> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:mainhealer:1125035848841310258> __**MainHealer**__(${mainhealerusers.length})`,
                value: `  ${mainhealerusers
                  .map(
                    (user) => "<:mainhealer:1125035848841310258> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:greatarcane:1125035859067023451> __**GreatArcane**__(${greatarcaneusers.length})`,
                value: `  ${greatarcaneusers
                  .map(
                    (user) => "<:greatarcane:1125035859067023451> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:onehandarcane:1125035868919443466> __**OneHandArcane**__(${onehandarcaneusers.length})`,
                value: ` ${onehandarcaneusers
                  .map(
                    (user) =>
                      "<:onehandarcane:1125035868919443466> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: " ",
                value: " ",
                inline: false,
              },
              {
                name: `<:ironroot:1125035836723953766> __**IronRoot**__(${ironrootusers.length})`,
                value: `  ${ironrootusers
                  .map((user) => "<:ironroot:1125035836723953766> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:shadowcaller:1125035825512587274> __**ShadowCaller**__(${shadowcallerusers.length})`,
                value: ` ${shadowcallerusers
                  .map(
                    (user) => "<:shadowcaller:1125035825512587274> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Weeping:1222540055462019302> __**RealmBreaker**__(${realmbreakerusers.length})`,
                value: ` ${realmbreakerusers
                  .map(
                    (user) => "<:Weeping:1222540055462019302> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Blazing:1125035751722209310> __**EarthRune**__(${earthruneusers.length})`,
                value: ` ${earthruneusers
                  .map((user) => "<:Blazing:1125035751722209310> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:chillhowl:1125035788392988702> __**Frost**__(${chillhowleusers.length})`,
                value: ` ${chillhowleusers
                  .map(
                    (user) => "<:chillhowl:1125035788392988702> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Lightcaller:1211672001874501632>  __**Lightcaller**__(${lightcallerusers.length})`,
                value: ` ${lightcallerusers
                  .map((user) => "<:Lightcaller:1211672001874501632> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:fillall:1125430605677609033> __**Fill All**__(${fillallusers.length})`,
                value: ` ${fillallusers
                  .map((user) => "<:fillall:1125430605677609033> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:scout:1125430590116737056> __**Scout**__(${scoutusers.length})`,
                value: ` ${scoutusers
                  .map((user) => "<:scout:1125430590116737056> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:absence:1125430596794077255> __**Absence**__(${absenceusers.length})`,
                value: ` ${absenceusers
                  .map((user) => "<:absence:1125430596794077255> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: false,
              },
            ]),
        ],
      });
    }
    if (fieldname == "image") {
      message.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle(originalTitle)
            .setDescription(originalDescription)
            .setColor(originalColor)
            .setFooter({
              text: "Made By INFINITY",
              iconURL:
                "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
            })
            .setTimestamp()
            .setImage(fieldvalue)
            .addFields([
              {
                name: " ",
                value: originalRaidleadername,
                inline: true,
              },
              {
                name: " ",
                value: `<:total:1129625110605737994> ** ${
                  maintankusers.length +
                  offtankusers.length +
                  greatarcaneusers.length +
                  onehandarcaneusers.length +
                  mainhealerusers.length +
                  ironrootusers.length +
                  shadowcallerusers.length +
                  realmbreakerusers.length +
                  earthruneusers.length +
                  chillhowleusers.length +
                  lightcallerusers.length +
                  fillallusers.length +
                  scoutusers.length
                } **`,
                inline: true,
              },
              {
                name: " ",
                value: originalVoiceChannelName,
                inline: true,
              },
              {
                name: " ",
                value: originalCalendarValue,
                inline: true,
              },
              {
                name: " ",
                value: originalClockValue,
                inline: true,
              },
              {
                name: " ",
                value: originalHourglassValue,
                inline: true,
              },
              {
                name: `<:maintank:918772807339474984> __**MainTank**__(${maintankusers.length})`,
                value: ` ${maintankusers
                  .map((user) => "<:maintank:918772807339474984> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:offtank:1125035880541855825> __**OffTank**__(${offtankusers.length})`,
                value: ` ${offtankusers
                  .map((user) => "<:offtank:1125035880541855825> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:mainhealer:1125035848841310258> __**MainHealer**__(${mainhealerusers.length})`,
                value: `  ${mainhealerusers
                  .map(
                    (user) => "<:mainhealer:1125035848841310258> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:greatarcane:1125035859067023451> __**GreatArcane**__(${greatarcaneusers.length})`,
                value: `  ${greatarcaneusers
                  .map(
                    (user) => "<:greatarcane:1125035859067023451> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:onehandarcane:1125035868919443466> __**OneHandArcane**__(${onehandarcaneusers.length})`,
                value: ` ${onehandarcaneusers
                  .map(
                    (user) =>
                      "<:onehandarcane:1125035868919443466> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: " ",
                value: " ",
                inline: false,
              },
              {
                name: `<:ironroot:1125035836723953766> __**IronRoot**__(${ironrootusers.length})`,
                value: `  ${ironrootusers
                  .map((user) => "<:ironroot:1125035836723953766> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:shadowcaller:1125035825512587274> __**ShadowCaller**__(${shadowcallerusers.length})`,
                value: ` ${shadowcallerusers
                  .map(
                    (user) => "<:shadowcaller:1125035825512587274> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Weeping:1222540055462019302> __**RealmBreaker**__(${realmbreakerusers.length})`,
                value: ` ${realmbreakerusers
                  .map(
                    (user) => "<:Weeping:1222540055462019302> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Blazing:1125035751722209310> __**EarthRune**__(${earthruneusers.length})`,
                value: ` ${earthruneusers
                  .map((user) => "<:Blazing:1125035751722209310> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:chillhowl:1125035788392988702> __**Frost**__(${chillhowleusers.length})`,
                value: ` ${chillhowleusers
                  .map(
                    (user) => "<:chillhowl:1125035788392988702> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Lightcaller:1211672001874501632>  __**Lightcaller**__(${lightcallerusers.length})`,
                value: ` ${lightcallerusers
                  .map((user) => "<:Lightcaller:1211672001874501632> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:fillall:1125430605677609033> __**Fill All**__(${fillallusers.length})`,
                value: ` ${fillallusers
                  .map((user) => "<:fillall:1125430605677609033> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:scout:1125430590116737056> __**Scout**__(${scoutusers.length})`,
                value: ` ${scoutusers
                  .map((user) => "<:scout:1125430590116737056> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:absence:1125430596794077255> __**Absence**__(${absenceusers.length})`,
                value: ` ${absenceusers
                  .map((user) => "<:absence:1125430596794077255> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: false,
              },
            ]),
        ],
      });
    }
    if (fieldname == "date-time") {
      const dateTimeString = `${fieldvalue}`;
      const selectedDate = DateTime.fromFormat(
        dateTimeString,
        "yyyy-MM-dd HH:mm"
      ).toJSDate();
      // Format the date and time using the previous JavaScript code
      const ts = selectedDate.getTime().toString();
      const timestampCode = `<t:${Math.floor(
        selectedDate.getTime() / 1000
      )}:R>`;
      const formattedDate = `<t:${Math.floor(
        selectedDate.getTime() / 1000
      )}:D>`;
      const formattedTime = `<t:${Math.floor(
        selectedDate.getTime() / 1000
      )}:t>`;

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

      message.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle(originalTitle)
            .setDescription(originalDescription)
            .setColor(originalColor)
            .setFooter({
              text: "Made By INFINITY",
              iconURL:
                "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
            })
            .setTimestamp()
            .setImage(originalImage.url)
            .addFields([
              {
                name: " ",
                value: originalRaidleadername,
                inline: true,
              },
              {
                name: " ",
                value: `<:total:1129625110605737994> ** ${
                  maintankusers.length +
                  offtankusers.length +
                  greatarcaneusers.length +
                  onehandarcaneusers.length +
                  mainhealerusers.length +
                  ironrootusers.length +
                  shadowcallerusers.length +
                  realmbreakerusers.length +
                  earthruneusers.length +
                  chillhowleusers.length +
                  lightcallerusers.length +
                  fillallusers.length +
                  scoutusers.length
                } **`,
                inline: true,
              },
              {
                name: " ",
                value: originalVoiceChannelName,
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
                name: `<:maintank:918772807339474984> __**MainTank**__(${maintankusers.length})`,
                value: ` ${maintankusers
                  .map((user) => "<:maintank:918772807339474984> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:offtank:1125035880541855825> __**OffTank**__(${offtankusers.length})`,
                value: ` ${offtankusers
                  .map((user) => "<:offtank:1125035880541855825> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:mainhealer:1125035848841310258> __**MainHealer**__(${mainhealerusers.length})`,
                value: `  ${mainhealerusers
                  .map(
                    (user) => "<:mainhealer:1125035848841310258> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:greatarcane:1125035859067023451> __**GreatArcane**__(${greatarcaneusers.length})`,
                value: `  ${greatarcaneusers
                  .map(
                    (user) => "<:greatarcane:1125035859067023451> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:onehandarcane:1125035868919443466> __**OneHandArcane**__(${onehandarcaneusers.length})`,
                value: ` ${onehandarcaneusers
                  .map(
                    (user) =>
                      "<:onehandarcane:1125035868919443466> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: " ",
                value: " ",
                inline: false,
              },
              {
                name: `<:ironroot:1125035836723953766> __**IronRoot**__(${ironrootusers.length})`,
                value: `  ${ironrootusers
                  .map((user) => "<:ironroot:1125035836723953766> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:shadowcaller:1125035825512587274> __**ShadowCaller**__(${shadowcallerusers.length})`,
                value: ` ${shadowcallerusers
                  .map(
                    (user) => "<:shadowcaller:1125035825512587274> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Weeping:1222540055462019302> __**RealmBreaker**__(${realmbreakerusers.length})`,
                value: ` ${realmbreakerusers
                  .map(
                    (user) => "<:Weeping:1222540055462019302> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Blazing:1125035751722209310> __**EarthRune**__(${earthruneusers.length})`,
                value: ` ${earthruneusers
                  .map((user) => "<:Blazing:1125035751722209310> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:chillhowl:1125035788392988702> __**Frost**__(${chillhowleusers.length})`,
                value: ` ${chillhowleusers
                  .map(
                    (user) => "<:chillhowl:1125035788392988702> " + user.name
                  )
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:Lightcaller:1211672001874501632>  __**Lightcaller**__(${lightcallerusers.length})`,
                value: ` ${lightcallerusers
                  .map((user) => "<:Lightcaller:1211672001874501632> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:fillall:1125430605677609033> __**Fill All**__(${fillallusers.length})`,
                value: ` ${fillallusers
                  .map((user) => "<:fillall:1125430605677609033> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:scout:1125430590116737056> __**Scout**__(${scoutusers.length})`,
                value: ` ${scoutusers
                  .map((user) => "<:scout:1125430590116737056> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: true,
              },
              {
                name: `<:absence:1125430596794077255> __**Absence**__(${absenceusers.length})`,
                value: ` ${absenceusers
                  .map((user) => "<:absence:1125430596794077255> " + user.name)
                  .join("\n")} \n\u200B`,
                inline: false,
              },
            ]),
        ],
      });
    }
  } catch (error) {
    console.error("Something went wrong when fetching the message:", error);
    // Return as `message.author` may be undefined/null
    return;
  }
};
