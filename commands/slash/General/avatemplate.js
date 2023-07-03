const { EmbedBuilder } = require("discord.js");
const { DateTime } = require("luxon");
const { log, e } = require("mathjs");

module.exports = {
    name: "avatemplate",
    description: "Creates an AvA template!",
    type: 1,
    options: [
    //     {
    //         name: "name",
    //         description: "The name of the AvA",
    //         type: 3,
    //         required: true
    //     },
    //     {
    //         name: "date",
    //         description: "The date for the AvA (YYYY-MM-DD)",
    //         type: 3,
    //         required: true
    //     },
    //     {
    //         name: "time",
    //         description: "The time of the AvA in UTC 24 Hours Format (HH:MM AM/PM)",
    //         type: 3,
    //         required: true
    //     },
    //     {
    //         name: "description",
    //         description: "The description of the AvA",
    //         type: 3,
    //         required: true
    //     }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
        ROLES: [1068816615862440016]
    },
    run: async (client, interaction, config, db) => {        
        const member = interaction.member;
        if (!member.roles.cache.has("1068816615862440016")) {
            return interaction.reply("Only raidleaders can execute this command.");
        }
        // const name = interaction.options.getString("name");
        // const date = interaction.options.getString("date");
        // const time = interaction.options.getString("time");
        // const description = interaction.options.getString("description");

        // // Convert the provided date and time to a JavaScript Date object
        // const dateTimeString = `${date} ${time}`;
        // const selectedDate = DateTime.fromFormat(dateTimeString, "yyyy-MM-dd hh:mm a").toJSDate();

        // // Format the date and time using the previous JavaScript code
        // const ts = selectedDate.getTime().toString();
        // const timestampCode = `<t:${Math.floor(selectedDate.getTime() / 1000)}:R>`;

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
                .setTitle("AvA Template")
                .setDescription("hi")
                .setColor("Gold")
                .setFooter({
                  text: "Made By Black-Rose Bot",
                  iconURL:
                    "https://cdn.discordapp.com/attachments/1073378626080362516/1076777453709688882/AdobeStock_555578592.jpeg",
                })
                .setTimestamp()
                .setImage(
                  "https://cdn.discordapp.com/attachments/1073378626080362516/1125048253000466453/blackrose4k.jpg"
                )
                .addFields([
                    {
                        name:"🗓️",
                        value:" ",
                        inline: true,
                    },
                    {
                        name:"⏰",
                        value:" ",
                        inline: true,
                    },
                    {
                        name:"⌛",
                        value:"\n\u200B",
                        inline: true,
                    },
                    {
                      name: "<:maintank:918772807339474984> | __**MainTank**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:offtank:1125035880541855825> | __**OffTank**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:greatarcane:1125035859067023451> | __**MainHealer**__",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:onehandarcane:1125035868919443466> | __**GreatArcane**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:mainhealer:1125035848841310258> | __**OneHandedArcane**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:ironroot:1125035836723953766> | __**IronRoot**__",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:shadowcaller:1125035825512587274> | __**ShadowCaller**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:carving:1125035809628762143> | __**Carving**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:realmbreaker:1125035797767258213> | __**RealmBreaker**__",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:spirithunter:1125035741173514302> | __**SpritHunter**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:specterjacket:1125035760492494848> | __**SpecterJacket**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:chillhowl:1125035788392988702> | __**Chillhowl**__",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:greatfire:1125446279183486996> | __**GreatFire**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:xbow:1125035778796441700> | __**Xbow**__",
                      value: " ",
                      inline: true,
                    },
                    {
                      name: "<:fillall:1125430605677609033> | __**Fill All**__",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                      name: "<:scout:1125430590116737056> | __**Scout**__",
                      value: "\n\u200B",
                      inline: true,
                    },
                    {
                        name: "<:absence:1125430596794077255> | __**Absence**__",
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

                // Declare the reaction arrays
                let maintankreactions = [];
                let offtankreactions = [];
                let greatarcanereactions = [];
                let onehandarcanereactions = [];
                let mainhealerreactions = [];
                let ironrootreactions = [];
                let shadowcallerreactions = [];
                let carvingreactions = [];
                let realmbreakerreactions = [];
                let spirithunterreactions = [];
                let specterjacketreactions = [];
                let chillhowlereactions = [];
                let greatfirereactions = [];
                let xbowreactions = [];
                let fillallreactions = [];
                let scoutreactions = [];
                let absencereactions = [];

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
                    maintankreactions = await maintankReaction.users.fetch();
                    maintankusers = maintankreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(offtankemoji)) {
                    const offtankReaction = reactionCollection.get(offtankemoji);
                    offtankreactions = await offtankReaction.users.fetch();
                    offtankusers = offtankreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(greatarcaneemoji)) {
                    const greatarcaneReaction = reactionCollection.get(greatarcaneemoji);
                    greatarcanereactions = await greatarcaneReaction.users.fetch();
                    greatarcaneusers = greatarcanereactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(onehandarcaneemoji)) {
                    const onehandarcaneReaction = reactionCollection.get(onehandarcaneemoji);
                    onehandarcanereactions = await onehandarcaneReaction.users.fetch();
                    onehandarcaneusers = onehandarcanereactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(mainhealeremoji)) {
                    const mainhealerReaction = reactionCollection.get(mainhealeremoji);
                    mainhealerreactions = await mainhealerReaction.users.fetch();
                    mainhealerusers = mainhealerreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(ironrootemoji)) {
                    const ironrootReaction = reactionCollection.get(ironrootemoji);
                    ironrootreactions = await ironrootReaction.users.fetch();
                    ironrootusers = ironrootreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(shadowcalleremoji)) {
                    const shadowcallerReaction = reactionCollection.get(shadowcalleremoji);
                    shadowcallerreactions = await shadowcallerReaction.users.fetch();
                    shadowcallerusers = shadowcallerreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(carvingemoji)) {
                    const carvingReaction = reactionCollection.get(carvingemoji);
                    carvingreactions = await carvingReaction.users.fetch();
                    carvingusers = carvingreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(realmbreakeremoji)) {
                    const realmbreakerReaction = reactionCollection.get(realmbreakeremoji);
                    realmbreakerreactions = await realmbreakerReaction.users.fetch();
                    realmbreakerusers = realmbreakerreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(spirithunteremoji)) {
                    const spirithunterReaction = reactionCollection.get(spirithunteremoji);
                    spirithunterreactions = await spirithunterReaction.users.fetch();
                    spirithunterusers = spirithunterreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(specterjacketemoji)) {
                    const specterjacketReaction = reactionCollection.get(specterjacketemoji);
                    specterjacketreactions = await specterjacketReaction.users.fetch();
                    specterjacketusers = specterjacketreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(chillhowlemoji)) {
                    const chillhowleReaction = reactionCollection.get(chillhowlemoji);
                    chillhowlereactions = await chillhowleReaction.users.fetch();
                    chillhowleusers = chillhowlereactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(greatfireemoji)) {
                    const greatfireReaction = reactionCollection.get(greatfireemoji);
                    greatfirereactions = await greatfireReaction.users.fetch();
                    greatfireusers = greatfirereactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(xbowemoji)) {
                    const xbowReaction = reactionCollection.get(xbowemoji);
                    xbowreactions = await xbowReaction.users.fetch();
                    xbowusers = xbowreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(fillallemoji)) {
                    const fillallReaction = reactionCollection.get(fillallemoji);
                    fillallreactions = await fillallReaction.users.fetch();
                    fillallusers = fillallreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(scoutemoji)) {
                    const scoutReaction = reactionCollection.get(scoutemoji);
                    scoutreactions = await scoutReaction.users.fetch();
                    scoutusers = scoutreactions.filter(user => !user.bot).map(user => user.username);
                }
                if (reactionCollection.has(absenceemoji)) {
                    const absenceReaction = reactionCollection.get(absenceemoji);
                    absencereactions = await absenceReaction.users.fetch();
                    absenceusers = absencereactions.filter(user => !user.bot).map(user => user.username);
                }

                console.log(`Users who reacted with maintankemoji: ${maintankusers.join(", ")}`);
                console.log(`Users who reacted with offtankemoji: ${offtankusers.join(", ")}`);
                console.log(`Users who reacted with greatarcaneemoji: ${greatarcaneusers.join(", ")}`);
                console.log(`Users who reacted with onehandarcaneemoji: ${onehandarcaneusers.join(", ")}`);
                console.log(`Users who reacted with mainhealeremoji: ${mainhealerusers.join(", ")}`);
                console.log(`Users who reacted with ironrootemoji: ${ironrootusers.join(", ")}`);
                console.log(`Users who reacted with shadowcalleremoji: ${shadowcallerusers.join(", ")}`);
                console.log(`Users who reacted with carvingemoji: ${carvingusers.join(", ")}`);
                console.log(`Users who reacted with realmbreakeremoji: ${realmbreakerusers.join(", ")}`);
                console.log(`Users who reacted with spirithunteremoji: ${spirithunterusers.join(", ")}`);
                console.log(`Users who reacted with specterjacketemoji: ${specterjacketusers.join(", ")}`);
                console.log(`Users who reacted with chillhowlemoji: ${chillhowleusers.join(", ")}`);
                console.log(`Users who reacted with greatfireemoji: ${greatfireusers.join(", ")}`);
                console.log(`Users who reacted with xbowemoji: ${xbowusers.join(", ")}`);
                console.log(`Users who reacted with fillallemoji: ${fillallusers.join(", ")}`);
                console.log(`Users who reacted with scoutemoji: ${scoutusers.join(", ")}`);
                console.log(`Users who reacted with absenceemoji: ${absenceusers.join(", ")}`);

            } catch (error) {
              console.error('Something went wrong when fetching the message:', error);
              // Return as `message.author` may be undefined/null
              return;
            }
        };          

        // Listen for the messageReactionAdd event and call the fetchReactions function
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.id === message.id && user.bot === false) {
              await fetchReactions();
            }
        });
    },
};