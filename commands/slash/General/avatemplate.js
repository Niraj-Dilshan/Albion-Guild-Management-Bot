const { EmbedBuilder } = require("discord.js");
const { DateTime } = require("luxon");
const { log, e } = require("mathjs");

module.exports = {
    name: "avatemplate",
    description: "Creates an AvA template!",
    type: 1,
    options: [
        {
            name: "name",
            description: "The name of the AvA",
            type: 3,
            required: true
        },
        {
            name: "date",
            description: "The date for the AvA (YYYY-MM-DD)",
            type: 3,
            required: true
        },
        {
            name: "time",
            description: "The time of the AvA in UTC 24 Hours Format (HH:MM)",
            type: 3,
            required: true
        },
        {
            name: "description",
            description: "The description of the AvA",
            type: 3,
            required: true
        },
        {
            name: "image",
            description: "image link for the AvA(URL)",
            type: 3,
            required: true
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
        ROLES: [1128358796239060992]
    },
    run: async (client, interaction, config, db) => {        
        const member = interaction.member;
        if (!member.roles.cache.has("1068816615862440016")) {
            return interaction.reply("Only raidleaders can execute this command.");
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

        const formattedDate = `<t:${Math.floor(selectedDate.getTime() / 1000)}:D>`;// Format the date
        const formattedTime = `<t:${Math.floor(selectedDate.getTime() / 1000)}:t>`;

        // declare emojis
        const maintankemoji = '918772807339474984';
        const offtankemoji = '1125035880541855825';
        const greatarcaneemoji = '1125035859067023451';
        const onehandarcaneemoji = '1125035868919443466';
        const mainhealeremoji = '1125035848841310258';
        const ironrootemoji = '1125035836723953766';
        const shadowcalleremoji = '1125035825512587274';
        const carvingemoji = '1125035809628762143';
        const realmbreakeremoji = '1125035797767258213';
        const spirithunteremoji = '1125035741173514302';
        const specterjacketemoji = '1125035760492494848';
        const chillhowlemoji = '1125035788392988702';
        const greatfireemoji = '1125446279183486996';
        const xbowemoji = '1125035778796441700';
        const fillallemoji = '1125430605677609033';
        const scoutemoji = '1125430590116737056';
        const absenceemoji = '1125430596794077255';

        const emojiarray = [maintankemoji, offtankemoji, greatarcaneemoji, onehandarcaneemoji, mainhealeremoji, ironrootemoji, shadowcalleremoji, carvingemoji, realmbreakeremoji, spirithunteremoji, specterjacketemoji, chillhowlemoji, greatfireemoji, xbowemoji, fillallemoji, scoutemoji, absenceemoji];

        interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(name)
                .setDescription(`${description}`)
                .setColor("Gold")
                .setFooter({
                  text: "Made By Black-Rose Bot",
                  iconURL:
                    "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                })
                .setTimestamp()
                .setImage(image)
                .addFields([
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
                      name: "<:maintank:918772807339474984> __**MainTank**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:offtank:1125035880541855825> __**OffTank**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:mainhealer:1125035848841310258> __**MainHealer**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:greatarcane:1125035859067023451> __**GreatArcane**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:onehandarcane:1125035868919443466> __**OneHandArcane**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                        name: " ",
                        value: "\n\u200B",
                        inline: false,
                    },
                    {
                      name: "<:ironroot:1125035836723953766> __**IronRoot**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:shadowcaller:1125035825512587274> __**ShadowCaller**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:carving:1125035809628762143> __**Carving**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:realmbreaker:1125035797767258213> __**RealmBreaker**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:spirithunter:1125035741173514302> __**SpritHunter**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:specterjacket:1125035760492494848> __**SpecterJacket**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:chillhowl:1125035788392988702> __**Chillhowl**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:greatfire:1125446279183486996> __**GreatFire**__(0)",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:xbow:1125035778796441700>  __**Xbow**__(0)",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:fillall:1125430605677609033> __**Fill All**__(0)",
                      value: " ",
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

        emojiarray.forEach(emoji => {
            message.react(emoji);
        });

        // Function to fetch reactions
        const fetchReactions = async () => {
            try {
                // Fetch the message to ensure all properties are available
                await message.fetch();

                // Declare the user arrays
                let maintankusers = [];
                let offtankusers = [];
                let greatarcaneusers = [];
                let onehandarcaneusers = [];
                let mainhealerusers = [];
                let ironrootusers = [];
                let shadowcallerusers = [];
                let carvingusers = [];
                let realmbreakerusers = [];
                let spirithunterusers = [];
                let specterjacketusers = [];
                let chillhowleusers = [];
                let greatfireusers = [];
                let xbowusers = [];
                let fillallusers = [];
                let scoutusers = [];
                let absenceusers = [];
          
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
                if (reactionCollection.has(offtankemoji)) {
                  const offtankReaction = reactionCollection.get(offtankemoji);
                  const offtankUserIds = (await offtankReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);
                
                  // Fetch server nicknames for the users
                  offtankusers = offtankUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName };
                  });
                }
                if (reactionCollection.has(greatarcaneemoji)) {
                    const greatarcaneReaction = reactionCollection.get(greatarcaneemoji);
                    const greatarcaneUserIds = (await greatarcaneReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                    // Fetch server nicknames for the users
                    greatarcaneusers = greatarcaneUserIds.map(userId => {
                      const member = message.guild.members.cache.get(userId);
                      const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                      return { id: userId, name: displayName };
                    });
                }
                if (reactionCollection.has(onehandarcaneemoji)) {
                  const onehandarcaneReaction = reactionCollection.get(onehandarcaneemoji);
                  const onehandarcaneUserIds = (await onehandarcaneReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  onehandarcaneusers = onehandarcaneUserIds.map(userId => {
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
                if (reactionCollection.has(ironrootemoji)) {
                  const ironrootReaction = reactionCollection.get(ironrootemoji);
                  const ironrootUserIds = (await ironrootReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  ironrootusers = ironrootUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName };
                  });
                }
                if (reactionCollection.has(shadowcalleremoji)) {
                  const shadowcallerReaction = reactionCollection.get(shadowcalleremoji);
                  const shadowcallerUserIds = (await shadowcallerReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  shadowcallerusers = shadowcallerUserIds.map(userId => {
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
                if (reactionCollection.has(specterjacketemoji)) {
                  const specterjacketReaction = reactionCollection.get(specterjacketemoji);
                  const specterjacketUserIds = (await specterjacketReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  specterjacketusers = specterjacketUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName };
                  });    
                }
                if (reactionCollection.has(chillhowlemoji)) {
                  const chillhowlReaction = reactionCollection.get(chillhowlemoji);
                  const chillhowlUserIds = (await chillhowlReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  chillhowleusers = chillhowlUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName };
                  });    
                
                }
                if (reactionCollection.has(greatfireemoji)) {
                  const greatfireReaction = reactionCollection.get(greatfireemoji);
                  const greatfireUserIds = (await greatfireReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  greatfireusers = greatfireUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName };
                  });    
                }
                if (reactionCollection.has(xbowemoji)) {
                  const xbowReaction = reactionCollection.get(xbowemoji);
                  const xbowUserIds = (await xbowReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  xbowusers = xbowUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName };
                  });    
                }
                if (reactionCollection.has(fillallemoji)) {
                  const fillallReaction = reactionCollection.get(fillallemoji);
                  const fillallUserIds = (await fillallReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  fillallusers = fillallUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName };
                  });    
                }
                if (reactionCollection.has(scoutemoji)) {
                  const scoutReaction = reactionCollection.get(scoutemoji);
                  const scoutUserIds = (await scoutReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  scoutusers = scoutUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName };
                  });
                }
                if (reactionCollection.has(absenceemoji)) {
                  const absenceReaction = reactionCollection.get(absenceemoji);
                  const absenceUserIds = (await absenceReaction.users.fetch()).filter(user => !user.bot).map(user => user.id);

                  // Fetch server nicknames for the users
                  absenceusers = absenceUserIds.map(userId => {
                    const member = message.guild.members.cache.get(userId);
                    const displayName = member ? (member.nickname || member.user.username) : "Unknown User";
                    return { id: userId, name: displayName, };
                  });
                }

                const originalEmbed = message.embeds[0];
                const originalTitle = originalEmbed.title;
                const originalDescription = originalEmbed.description;
                const originalImage = originalEmbed.image;
                const originalFooter = originalEmbed.footer;
                const originalColor = originalEmbed.color;
                const originalFields = originalEmbed.fields;

                let originalCalendarValue, originalClockValue, originalHourglassValue;

                originalFields.forEach(field => {
                  switch (field.name) {
                    case '\u200B':
                      originalCalendarValue = field.value;
                      break;
                    case '\u200C':
                      originalClockValue = field.value;
                      break;
                    case '\u200D':
                      originalHourglassValue = field.value;
                      break;
                  }
                });

                // Update the embed with the new reaction counts
                message.edit({
                    embeds: [
                      new EmbedBuilder()
                      .setTitle(originalTitle)
                      .setDescription(originalDescription)
                      .setColor(originalColor)
                      .setFooter({
                        text: "Made By Black-Rose Bot",
                        iconURL:
                          "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                      })
                      .setTimestamp()
                      .setImage(originalImage.url)
                      .addFields([
                          {
                              name:"\u200B",
                              value:`${originalCalendarValue}`,
                              inline: true,
                          },
                          {
                              name:"\u200C",
                              value:`${originalClockValue}`,
                              inline: true,
                          },
                          {
                              name:"\u200D",
                              value:`${originalHourglassValue}\n\u200B`,
                              inline: true,
                          },
                          {
                            name: `<:maintank:918772807339474984> __**MainTank**__(${maintankusers.length})`,
                            value: ` ${maintankusers.map(user => '<:maintank:918772807339474984> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name:  `<:offtank:1125035880541855825> __**OffTank**__(${offtankusers.length})`,
                            value: ` ${offtankusers.map(user => '<:offtank:1125035880541855825> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name:  `<:mainhealer:1125035848841310258> __**MainHealer**__(${mainhealerusers.length})`,
                            value: `  ${mainhealerusers.map(user => '<:mainhealer:1125035848841310258> ' + user.name).join("\n")} \n\u200B`,
                            inline: true,
                          },
                          {
                            name: `<:greatarcane:1125035859067023451> __**GreatArcane**__(${greatarcaneusers.length})`,
                            value: `  ${greatarcaneusers.map(user => '<:greatarcane:1125035859067023451> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name: `<:onehandarcane:1125035868919443466> __**OneHandArcane**__(${onehandarcaneusers.length})`,
                            value: ` ${onehandarcaneusers.map(user => '<:onehandarcane:1125035868919443466> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                              name: " ",
                              value: "\n\u200B",
                              inline: false,
                          },
                          {
                            name: `<:ironroot:1125035836723953766> __**IronRoot**__(${ironrootusers.length})`,
                            value: `  ${ironrootusers.map(user => '<:ironroot:1125035836723953766> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name: `<:shadowcaller:1125035825512587274> __**ShadowCaller**__(${shadowcallerusers.length})`,
                            value: ` ${shadowcallerusers.map(user => '<:shadowcaller:1125035825512587274> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name: `<:carving:1125035809628762143> __**Carving**__(${carvingusers.length})`,
                            value: ` ${carvingusers.map(user => '<:carving:1125035809628762143> ' + user.name).join("\n")} \n\u200B`,
                            inline: true,
                          },
                          {
                            name: `<:realmbreaker:1125035797767258213> __**RealmBreaker**__(${realmbreakerusers.length})`,
                            value: ` ${realmbreakerusers.map(user => '<:realmbreaker:1125035797767258213> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name: `<:spirithunter:1125035741173514302> __**SpritHunter**__(${spirithunterusers.length})`,
                            value: ` ${spirithunterusers.map(user => '<:spirithunter:1125035741173514302> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name: `<:specterjacket:1125035760492494848> __**SpecterJacket**__(${specterjacketusers.length})`,
                            value: ` ${specterjacketusers.map(user => '<:specterjacket:1125035760492494848> ' + user.name).join("\n")} \n\u200B`,
                            inline: true,
                          },
                          {
                            name: `<:chillhowl:1125035788392988702> __**Chillhowl**__(${chillhowleusers.length})`,
                            value: ` ${chillhowleusers.map(user => '<:chillhowl:1125035788392988702> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name: `<:greatfire:1125446279183486996> __**GreatFire**__(${greatfireusers.length})`,
                            value: ` ${greatfireusers.map(user => '<:greatfire:1125446279183486996> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name: `<:xbow:1125035778796441700>  __**Xbow**__(${xbowusers.length})`,
                            value: ` ${xbowusers.map(user => '<:xbow:1125035778796441700> ' + user.name).join("\n")} \n\u200B`,
                            inline: true,
                          },
                          {
                            name: `<:fillall:1125430605677609033> __**Fill All**__(${fillallusers.length})`,
                            value: ` ${fillallusers.map(user => '<:fillall:1125430605677609033> ' + user.name).join("\n")}`,
                            inline: true,
                          },
                          {
                            name: `<:scout:1125430590116737056> __**Scout**__(${scoutusers.length})`,
                            value: ` ${scoutusers.map(user => '<:scout:1125430590116737056> ' + user.name).join("\n")} \n\u200B`,
                            inline: true,
                          },
                          {
                              name: `<:absence:1125430596794077255> __**Absence**__(${absenceusers.length})`,
                              value: ` ${absenceusers.map(user => '<:absence:1125430596794077255> ' + user.name).join("\n")} \n\u200B`,
                              inline: false,
                          },
                        ]),
                    ],
                });
            } catch (error) {
              console.error('Something went wrong when fetching the message:', error);
              // Return as `message.author` may be undefined/null
              return;
            }
        };          
        
        client.on('messageReactionAdd', async (reaction, user) => {
          if (reaction.message.id === message.id && user.bot === false) {
            // Remove the user's previous reactions if they reacted with a new emoji
            const userReactions = reaction.message.reactions.cache.filter(
              (r) => r.users.cache.has(user.id) && r.emoji !== reaction.emoji
            );
        
            for (const userReaction of userReactions.values()) {
              await userReaction.users.remove(user.id);
            }
            await fetchReactions();
          }
        });
    },
};