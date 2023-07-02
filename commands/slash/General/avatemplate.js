const { EmbedBuilder } = require("discord.js");
const { DateTime } = require("luxon");

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
            description: "The time of the AvA in UTC 24 Hours Format (HH:MM AM/PM)",
            type: 3,
            required: true
        },
        {
            name: "description",
            description: "The description of the AvA",
            type: 3,
            required: true
        }
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
        const name = interaction.options.getString("name");
        const date = interaction.options.getString("date");
        const time = interaction.options.getString("time");
        const description = interaction.options.getString("description");

        // Convert the provided date and time to a JavaScript Date object
        const dateTimeString = `${date} ${time}`;
        const selectedDate = DateTime.fromFormat(dateTimeString, "yyyy-MM-dd hh:mm a").toJSDate();

        // Format the date and time using the previous JavaScript code
        const ts = selectedDate.getTime().toString();
        const timestampCode = `<t:${Math.floor(selectedDate.getTime() / 1000)}:R>`;

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Name: ${name}\nDate: ${date}\nTime: ${time}\nDescription: ${description}\nTimestamp: ${timestampCode}`)
                    .setColor('Gold')
            ]
        });

        const message = await interaction.fetchReply();
		message.react('<:maintank:918772807339474984>');
		message.react('<:offtank:1125035880541855825>');
		message.react('<:greatarcane:1125035859067023451>');
        message.react('<:onehandarcane:1125035868919443466>');
		message.react('<:mainhealer:1125035848841310258>');
		message.react('<:ironroot:1125035836723953766>');
        message.react('<:shadowcaller:1125035825512587274>');
		message.react('<:carving:1125035809628762143>');
		message.react('<:realmbreaker:1125035797767258213>');
        message.react('<:spirithunter:1125035741173514302>');
		message.react('<:specterjacket:1125035760492494848>');
		message.react('<:chillhowl:1125035788392988702>');
        message.react('<:blazing:1125035751722209310>');
		message.react('<:xbow:1125035778796441700>');

        // Function to fetch reactions
        const fetchReactions = async () => {
            try {
                // Fetch the message to ensure all properties are available
                await message.fetch();

                // Log the message author and ID
                console.log(`${message.author}'s message "${message.id}" gained reactions!`);

                // Get the reaction collection
                const reactionCollection = message.reactions.cache;

                // Get all users who reacted to the message
                const maintank = await reactionCollection.get('<:maintank:918772807339474984>').users.fetch();
                const maintankreactedUsers = maintank.filter(user => !user.bot);
                const offtank = await reactionCollection.get('<:offtank:1125035880541855825>').users.fetch();
                const offtankreactedUsers = offtank.filter(user => !user.bot);
                const greatarcane = await reactionCollection.get('<:greatarcane:1125035859067023451>').users.fetch();
                const greatarcanereactedUsers = greatarcane.filter(user => !user.bot);
                const onehandarcane = await reactionCollection.get('<:onehandarcane:1125035868919443466>').users.fetch();
                const onehandarcanereactedUsers = onehandarcane.filter(user => !user.bot);
                const mainhealer = await reactionCollection.get('<:mainhealer:1125035848841310258>').users.fetch();
                const mainhealerreactedUsers = mainhealer.filter(user => !user.bot);
                const ironroot = await reactionCollection.get('<:ironroot:1125035836723953766>').users.fetch();
                const ironrootreactedUsers = ironroot.filter(user => !user.bot);
                const shadowcaller = await reactionCollection.get('<:shadowcaller:1125035825512587274>').users.fetch();
                const shadowcallerreactedUsers = shadowcaller.filter(user => !user.bot);
                const carving = await reactionCollection.get('<:carving:1125035809628762143>').users.fetch();
                const carvingreactedUsers = carving.filter(user => !user.bot);
                const realmbreaker = await reactionCollection.get('<:realmbreaker:1125035797767258213>').users.fetch();
                const realmbreakerreactedUsers = realmbreaker.filter(user => !user.bot);
                const spirithunter = await reactionCollection.get('<:spirithunter:1125035741173514302>').users.fetch();
                const spirithunterreactedUsers = spirithunter.filter(user => !user.bot);
                const specterjacket = await reactionCollection.get('<:specterjacket:1125035760492494848>').users.fetch();
                const specterjacketreactedUsers = specterjacket.filter(user => !user.bot);
                const chillhowl = await reactionCollection.get('<:chillhowl:1125035788392988702>').users.fetch();
                const chillhowlreactedUsers = chillhowl.filter(user => !user.bot);
                const blazing = await reactionCollection.get('<:blazing:1125035751722209310>').users.fetch();
                const blazingreactedUsers = blazing.filter(user => !user.bot);
                const xbow = await reactionCollection.get('<:xbow:1125035778796441700>').users.fetch();
                const xbowreactedUsers = xbow.filter(user => !user.bot);

                // Generate a string of user names
                const maintankreactedUserNames = maintankreactedUsers.map(user => user.nickname).join(", ");
                const offtankreactedUserNames = offtankreactedUsers.map(user => user.nickname).join(", ");
                const greatarcanereactedUserNames = greatarcanereactedUsers.map(user => user.nickname).join(", ");
                const onehandarcanereactedUserNames = onehandarcanereactedUsers.map(user => user.nickname).join(", ");
                const mainhealerreactedUserNames = mainhealerreactedUsers.map(user => user.nickname).join(", ");
                const ironrootreactedUserNames = ironrootreactedUsers.map(user => user.nickname).join(", ");
                const shadowcallerreactedUserNames = shadowcallerreactedUsers.map(user => user.nickname).join(", ");
                const carvingreactedUserNames = carvingreactedUsers.map(user => user.nickname).join(", ");
                const realmbreakerreactedUserNames = realmbreakerreactedUsers.map(user => user.nickname).join(", ");
                const spirithunterreactedUserNames = spirithunterreactedUsers.map(user => user.nickname).join(", ");
                const specterjacketreactedUserNames = specterjacketreactedUsers.map(user => user.nickname).join(", ");
                const chillhowlreactedUserNames = chillhowlreactedUsers.map(user => user.nickname).join(", ");
                const blazingreactedUserNames = blazingreactedUsers.map(user => user.nickname).join(", ");
                const xbowreactedUserNames = xbowreactedUsers.map(user => user.nickname).join(", ");

                // Update the embed with the user names
                const updatedEmbed = new EmbedBuilder()
                    .setDescription(`Name: ${name}\nDate: ${date}\nTime: ${time}\nDescription: ${description}\nTimestamp: ${timestampCode}\n\n**Main Tank:** ${maintankreactedUserNames}\n**Off Tank:** ${offtankreactedUserNames}\n**Great Arcane:** ${greatarcanereactedUserNames}\n**One Hand Arcane:** ${onehandarcanereactedUserNames}\n**Main Healer:** ${mainhealerreactedUserNames}\n**Ironroot:** ${ironrootreactedUserNames}\n**Shadowcaller:** ${shadowcallerreactedUserNames}\n**Carving:** ${carvingreactedUserNames}\n**Realm Breaker:** ${realmbreakerreactedUserNames}\n**Spirit Hunter:** ${spirithunterreactedUserNames}\n**Specter Jacket:** ${specterjacketreactedUserNames}\n**Chillhowl:** ${chillhowlreactedUserNames}\n**Blazing:** ${blazingreactedUserNames}\n**Xbow:** ${xbowreactedUserNames}`)
                    .setColor('Gold');

                message.edit({ embeds: [updatedEmbed] });
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `message.author` may be undefined/null
                return;
            }
        };

        // Listen for the messageReactionAdd event and call the fetchReactions function
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.message.id === message.id) {
                fetchReactions();
            }
        });
    },
};