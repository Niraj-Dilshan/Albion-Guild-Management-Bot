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
		message.react('🍎');
		message.react('🍊');
		message.react('🍇');

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
                const users = await reactionCollection.get('🍎').users.fetch();
                const reactedUsers = users.filter(user => !user.bot);

                // Generate a string of user names
                const reactedUserNames = reactedUsers.map(user => user.username).join(", ");

                // Update the embed with the user names
                const updatedEmbed = new EmbedBuilder()
                    .setDescription(`Name: ${name}\nDate: ${date}\nTime: ${time}\nDescription: ${description}\nTimestamp: ${timestampCode}\nReacted Users: ${reactedUserNames}`)
                    .setColor('Gold');

                message.edit({ embeds: [updatedEmbed] });
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `message.author` may be undefined/null
                return;
            }
        };

        // Call the fetchReactions function when the specified time is reached
        const selectedDateObj = DateTime.fromFormat(dateTimeString, "yyyy-MM-dd hh:mm a");
        const currentTime = DateTime.now();

        const timeDifference = selectedDateObj.diff(currentTime, 'milliseconds').milliseconds;

        // Listen for the messageReactionAdd event and call the fetchReactions function
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.message.id === message.id) {
                fetchReactions();
            }
        });
    },
};