const { EmbedBuilder } = require("discord.js");
const { DateTime } = require("luxon");
const initializeDatabase = require('../../../database/database');
const { re } = require("mathjs");
const mongoose = initializeDatabase();

module.exports = {
    name: "pvptemplate",
    description: "Creates an PvP template!",
    type: 1,
    options: [
        {
            name: "name",
            description: "The name of the PvP",
            type: 3,
            required: true
        },
        {
            name: "date",
            description: "The date for the PvP (YYYY-MM-DD)",
            type: 3,
            required: true
        },
        {
            name: "time",
            description: "The time of the PvP in UTC 24 Hours Format (HH:MM)",
            type: 3,
            required: true
        },
        {
            name: "description",
            description: "The description of the PvP",
            type: 3,
            required: true
        },
        {
            name: "image",
            description: "image link for the PvP(URL)",
            type: 3,
            required: true
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config) => {        
        const member = interaction.member;
        if (!member.roles.cache.has('1068815986121244692') && member.id !== config.Users.OWNERS) {
          return interaction.reply("Only Content Creator and the owner can execute this command.");
      }
        const name = interaction.options.getString("name");
        const date = interaction.options.getString("date");
        const time = interaction.options.getString("time");
        const descriptionInput = interaction.options.getString("description");
        const description = descriptionInput.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
        const image = interaction.options.getString("image");

        // Convert the provided date and time to a JavaScript Date object
        const dateTimeString = `${date} ${time}`;
        const selectedDate = DateTime.fromFormat(dateTimeString, "yyyy-MM-dd HH:mm").toJSDate()

        // Format the date and time using the previous JavaScript code
        const ts = selectedDate.getTime().toString();
        const timestampCode = `<t:${Math.floor(selectedDate.getTime() / 1000)}:R>`;
        const formattedDate = `<t:${Math.floor(selectedDate.getTime() / 1000)}:D>`;
        const formattedTime = `<t:${Math.floor(selectedDate.getTime() / 1000)}:t>`;

        // declare emojis
        const maintankemoji = '1139482862937178172';
        const frontlinedeftankemoji = '1139482983397597196';
        const backlinedeftankemoji = '1139483020533960764';
        const clumptankemoji = '1139483008668270662';
        const mainhealeremoji = '1139482997255569439';
        const blighthealeremoji = '1139482874257621052';
        const onehandnatureemoji = '1139482850228453437';
        const greatholyemoji = '1139482975755587665';
        const enigmaticemoji = '1139482935246995487';
        const lifecurseemoji = '1139483040750510152';
        const bloodletteremoji = '1139482885787766804';
        const carvingemoji = '1139482896369987585';
        const realmbreakeremoji = '1139482815679975444';
        const fistsofavalonemoji = '1139482963491438674';
        const spikedgauntletsemoji = '1139482831123390584';
        const spirithunteremoji = '1139482844058615838';
        const demonfangemoji = '1139482924203380756';
        const permafrostemoji = '1139483049550151780';
        const dawnsongemoji = '1139482904079114272';
        const siegebowemoji = '1139482824064368691';

        const emojiarray = [maintankemoji, frontlinedeftankemoji, backlinedeftankemoji, clumptankemoji, mainhealeremoji, blighthealeremoji, onehandnatureemoji, greatholyemoji, enigmaticemoji, lifecurseemoji, bloodletteremoji, carvingemoji, realmbreakeremoji, fistsofavalonemoji, spikedgauntletsemoji, spirithunteremoji, demonfangemoji, permafrostemoji, dawnsongemoji, siegebowemoji];

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
                        value: "<:total:1129625110605737994> ** 0 **",
                        inline: false,
                    },
                    {
                        name:"\u200B",
                        value: `🗓️ ${formattedDate}`,
                        inline: true,
                    },
                    {
                        name:"\u200C",
                        value:`⏰ ${formattedTime}`,
                        inline: true,
                    },
                    {
                        name:"\u200D",
                        value:`⌛ ${timestampCode}\n\u200B`,
                        inline: true,
                    },
                    {
                      name: "<:1HMace:1139482862937178172> __**MainTank**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:GroveKeeper:1139482983397597196> __**FDefTank**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:HeavyMace:1139483020533960764> __**BDefTank**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:HandofJustice:1139483008668270662> __**ClumpTank**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:HallowFall:1139482997255569439> __**MainHeal**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Blight:1139482874257621052> __**BlightHeal**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:1HandNature:1139482850228453437> __**1HNatureHeal**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:GreatHoly:1139482975755587665> __**GreatHoly**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Enigmatic:1139482935246995487> __**Enigmatic**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Lifecurse:1139483040750510152> __**Lifecurse**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Bloodletter:1139482885787766804> __**Bloodletter**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Carving:1139482896369987585> __**Carving**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Realmbreaker:1139482815679975444>  __**Realmbreaker**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:FistsofAvalon:1139482963491438674> __**FistsofAvalon**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Spirithunter:1139482844058615838> __**Spirithunter**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:SpikedGauntlets:1139482831123390584> __**SpikedGauntlets**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Demonfang:1139482924203380756> __**Demonfang**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Permafrost:1139483049550151780> __**Permafrost**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Dawnsong:1139482904079114272> __**Dawnsong**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:Siegebow:1139482824064368691> __**Siegebow**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: " ",
                      value: "\n\u200B",
                      inline: true,
                    }
                  ]),
            ],
        });
          
        const message = await interaction.fetchReply();
        const channelId = interaction.channel.id;
        const db = mongoose.connection.useDb("PvP");
        const dbmodel = db.model('PvPRaids', new mongoose.Schema({ messageId: String, channelId: String, selectedDate: Date }));
        await dbmodel.create({ messageId: message.id, channelId:channelId , selectedDate: selectedDate });
        
        emojiarray.forEach(emoji => {
            message.react(emoji);
        });     
    },
};

module.exports.fetchPvPReactions = async function(message) {
  try {
      // Fetch the message to ensure all properties are available
      await message.fetch();

      // declare emojis
      // declare emojis
      const maintankemoji = '1139482862937178172';
      const frontlinedeftankemoji = '1139482983397597196';
      const backlinedeftankemoji = '1139483020533960764';
      const clumptankemoji = '1139483008668270662';
      const mainhealeremoji = '1139482997255569439';
      const blighthealeremoji = '1139482874257621052';
      const onehandnatureemoji = '1139482850228453437';
      const greatholyemoji = '1139482975755587665';
      const enigmaticemoji = '1139482935246995487';
      const lifecurseemoji = '1139483040750510152';
      const bloodletteremoji = '1139482885787766804';
      const carvingemoji = '1139482896369987585';
      const realmbreakeremoji = '1139482815679975444';
      const fistsofavalonemoji = '1139482963491438674';
      const spikedgauntletsemoji = '1139482831123390584';
      const spirithunteremoji = '1139482844058615838';
      const demonfangemoji = '1139482924203380756';
      const permafrostemoji = '1139483049550151780';
      const dawnsongemoji = '1139482904079114272';
      const siegebowemoji = '1139482824064368691';

      // Declare the user arrays
      let maintankusers = [];
      let frontlinedeftankusers = [];
      let backlinedeftankusers = [];
      let clumptankusers = [];
      let mainhealerusers = [];
      let blighthealerusers = [];
      let onehandnatureusers = [];
      let greatholyusers = [];
      let enigmaticusers = [];
      let lifecurseusers = [];
      let bloodletterusers = [];
      let carvingusers = [];
      let realmbreakerusers = [];
      let fistsofavalonusers = [];
      let spikedgauntletsusers = [];
      let spirithunterusers = [];
      let demonfangusers = [];
      let permafrostusers = [];
      let dawnsongusers = [];
      let siegebowusers = [];

      // Get the reaction collection
      const reactionCollection = message.reactions.cache;
  
      if (reactionCollection.has(maintankemoji)) {
        const maintankReaction = reactionCollection.get(maintankemoji);
        const maintankUserIds = (await maintankReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);
      
        // Fetch server nicknames for the users
        maintankusers = maintankUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(frontlinedeftankemoji)) {
        const frontlinedeftankReaction = reactionCollection.get(frontlinedeftankemoji);
        const frontlinedeftankUserIds = (await frontlinedeftankReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        frontlinedeftankusers = frontlinedeftankUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(backlinedeftankemoji)) {
        const backlinedeftankReaction = reactionCollection.get(backlinedeftankemoji);
        const backlinedeftankUserIds = (await backlinedeftankReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        backlinedeftankusers = backlinedeftankUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(clumptankemoji)) {
        const clumptankReaction = reactionCollection.get(clumptankemoji);
        const clumptankUserIds = (await clumptankReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        clumptankusers = clumptankUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(mainhealeremoji)) {
        const mainhealerReaction = reactionCollection.get(mainhealeremoji);
        const mainhealerUserIds = (await mainhealerReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        mainhealerusers = mainhealerUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(blighthealeremoji)) {
        const blighthealerReaction = reactionCollection.get(blighthealeremoji);
        const blighthealerUserIds = (await blighthealerReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        blighthealerusers = blighthealerUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(onehandnatureemoji)) {
        const onehandnatureReaction = reactionCollection.get(onehandnatureemoji);
        const onehandnatureUserIds = (await onehandnatureReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        onehandnatureusers = onehandnatureUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(greatholyemoji)) {
        const greatholyReaction = reactionCollection.get(greatholyemoji);
        const greatholyUserIds = (await greatholyReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        greatholyusers = greatholyUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        }); 
      }

      if (reactionCollection.has(enigmaticemoji)) {
        const enigmaticReaction = reactionCollection.get(enigmaticemoji);
        const enigmaticUserIds = (await enigmaticReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        enigmaticusers = enigmaticUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(lifecurseemoji)) {
        const lifecurseReaction = reactionCollection.get(lifecurseemoji);
        const lifecurseUserIds = (await lifecurseReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        lifecurseusers = lifecurseUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(bloodletteremoji)) {
        const bloodletterReaction = reactionCollection.get(bloodletteremoji);
        const bloodletterUserIds = (await bloodletterReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        bloodletterusers = bloodletterUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(carvingemoji)) {
        const carvingReaction = reactionCollection.get(carvingemoji);
        const carvingUserIds = (await carvingReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        carvingusers = carvingUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(realmbreakeremoji)) {
        const realmbreakerReaction = reactionCollection.get(realmbreakeremoji);
        const realmbreakerUserIds = (await realmbreakerReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        realmbreakerusers = realmbreakerUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(fistsofavalonemoji)) {
        const fistsofavalonReaction = reactionCollection.get(fistsofavalonemoji);
        const fistsofavalonUserIds = (await fistsofavalonReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        fistsofavalonusers = fistsofavalonUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(spikedgauntletsemoji)) {
        const spikedgauntletsReaction = reactionCollection.get(spikedgauntletsemoji);
        const spikedgauntletsUserIds = (await spikedgauntletsReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        spikedgauntletsusers = spikedgauntletsUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(spirithunteremoji)) {
        const spirithunterReaction = reactionCollection.get(spirithunteremoji);
        const spirithunterUserIds = (await spirithunterReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        spirithunterusers = spirithunterUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(demonfangemoji)) {
        const demonfangReaction = reactionCollection.get(demonfangemoji);
        const demonfangUserIds = (await demonfangReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        demonfangusers = demonfangUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(permafrostemoji)) {
        const permafrostReaction = reactionCollection.get(permafrostemoji);
        const permafrostUserIds = (await permafrostReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        permafrostusers = permafrostUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(dawnsongemoji)) {
        const dawnsongReaction = reactionCollection.get(dawnsongemoji);
        const dawnsongUserIds = (await dawnsongReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        dawnsongusers = dawnsongUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      }

      if (reactionCollection.has(siegebowemoji)) {
        const siegebowReaction = reactionCollection.get(siegebowemoji);
        const siegebowUserIds = (await siegebowReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

        // Fetch server nicknames for the users
        siegebowusers = siegebowUserIds.map(userId => {
          const member = message.guild.members.cache.get(userId);
          const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
          return { id: userId, name: displayName };
        });
      } 

      const originalEmbed = message.embeds[0];
      const originalTitle = originalEmbed.title;
      const originalDescription = originalEmbed.description;
      const originalImage = originalEmbed.image;
      const originalColor = originalEmbed.color;
      const originalFields = originalEmbed.fields;
      const originalCalendarValue = originalFields[1].value;
      const originalClockValue = originalFields[2].value;
      const originalHourglassValue = originalFields[3].value;

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
                    value: `<:total:1129625110605737994> ** ${ maintankusers.length + frontlinedeftankusers.length + backlinedeftankusers.length + clumptankusers.length + mainhealerusers.length + blighthealerusers.length + onehandnatureusers.length + greatholyusers.length + enigmaticusers.length + lifecurseusers.length + bloodletterusers.length + carvingusers.length + realmbreakerusers.length + fistsofavalonusers.length + spikedgauntletsusers.length + spikedgauntletsusers.length + demonfangusers.length + permafrostusers.length + dawnsongusers.length + siegebowusers.length } **`,
                    inline: false,
                },
                {
                    name:" ",
                    value: originalCalendarValue,
                    inline: true,
                },
                {
                    name:" ",
                    value: originalClockValue,
                    inline: true,
                },
                {
                    name:" ",
                    value: originalHourglassValue,
                    inline: true,
                },
                {
                  name: `<:1HMace:1139482862937178172> __**MainTank**__(${maintankusers.length})`,
                  value: ` ${maintankusers.map(user => '<:1HMace:1139482862937178172> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                
                {
                  name: `<:GroveKeeper:1139482983397597196> __**FDefTank**__(${frontlinedeftankusers.length})`,
                  value: ` ${frontlinedeftankusers.map(user => '<:GroveKeeper:1139482983397597196> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:HeavyMace:1139483020533960764> __**BDefTank**__(${backlinedeftankusers.length})`,
                  value: ` ${backlinedeftankusers.map(user => '<:HeavyMace:1139483020533960764> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:HandofJustice:1139483008668270662> __**ClumpTank**__(${clumptankusers.length})`,
                  value: ` ${clumptankusers.map(user => '<:HandofJustice:1139483008668270662> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:HallowFall:1139482997255569439> __**MainHeal**__(${mainhealerusers.length})`,
                  value: ` ${mainhealerusers.map(user => '<:HallowFall:1139482997255569439> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Blight:1139482874257621052> __**BlightHeal**__(${blighthealerusers.length})`,
                  value: ` ${blighthealerusers.map(user => '<:Blight:1139482874257621052> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:1HandNature:1139482850228453437> __**1HNatureHeal**__(${onehandnatureusers.length})`,
                  value: ` ${onehandnatureusers.map(user => '<:1HandNature:1139482850228453437> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:GreatHoly:1139482975755587665> __**GreatHoly**__(${greatholyusers.length})`,
                  value: ` ${greatholyusers.map(user => '<:GreatHoly:1139482975755587665> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Enigmatic:1139482935246995487> __**Enigmatic**__(${enigmaticusers.length})`,
                  value: ` ${enigmaticusers.map(user => '<:Enigmatic:1139482935246995487> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Lifecurse:1139483040750510152> __**Lifecurse**__(${lifecurseusers.length})`,
                  value: ` ${lifecurseusers.map(user => '<:Lifecurse:1139483040750510152> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Bloodletter:1139482885787766804> __**Bloodletter**__(${bloodletterusers.length})`,
                  value: ` ${bloodletterusers.map(user => '<:Bloodletter:1139482885787766804> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Carving:1139482896369987585> __**Carving**__(${carvingusers.length})`,
                  value: ` ${carvingusers.map(user => '<:Carving:1139482896369987585> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Realmbreaker:1139482815679975444>  __**Realmbreaker**__(${realmbreakerusers.length})`,
                  value: ` ${realmbreakerusers.map(user => '<:Realmbreaker:1139482815679975444> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:FistsofAvalon:1139482963491438674> __**FistsofAvalon**__(${fistsofavalonusers.length})`,
                  value: ` ${fistsofavalonusers.map(user => '<:FistsofAvalon:1139482963491438674> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Spirithunter:1139482844058615838> __**Spirithunter**__(${spirithunterusers.length})`,
                  value: ` ${spirithunterusers.map(user => '<:Spirithunter:1139482844058615838> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:SpikedGauntlets:1139482831123390584> __**SpikedGauntlets**__(${spikedgauntletsusers.length})`,
                  value: ` ${spikedgauntletsusers.map(user => '<:SpikedGauntlets:1139482831123390584> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Demonfang:1139482924203380756> __**Demonfang**__(${demonfangusers.length})`,
                  value: ` ${demonfangusers.map(user => '<:Demonfang:1139482924203380756> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Permafrost:1139483049550151780> __**Permafrost**__(${permafrostusers.length})`,
                  value: ` ${permafrostusers.map(user => '<:Permafrost:1139483049550151780> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Dawnsong:1139482904079114272> __**Dawnsong**__(${dawnsongusers.length})`,
                  value: ` ${dawnsongusers.map(user => '<:Dawnsong:1139482904079114272> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: `<:Siegebow:1139482824064368691> __**Siegebow**__(${siegebowusers.length})`,
                  value: ` ${siegebowusers.map(user => '<:Siegebow:1139482824064368691> ' + user.name).join("\n")} \n\u200B`,
                  inline: true,
                },
                {
                  name: " ",
                  value: "\n\u200B",
                  inline: true,
                }
              ]),
          ],
      });
      console.log("updated pvp template reactions");
  } catch (error) {
    console.error('Something went wrong when fetching the message:', error);
    // Return as `message.author` may be undefined/null
    return;
  }
};