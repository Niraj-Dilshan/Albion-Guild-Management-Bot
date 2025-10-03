const Event = require('../../database/models/Event');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(reaction, user) {
        if (user.bot) return;

        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        const event = await Event.findOne({ messageId: reaction.message.id });
        if (!event) return;

        const member = await reaction.message.guild.members.fetch(user.id);

        const updateAttendees = async () => {
            const attendees = event.attendees.map(id => `<@${id}>`).join('\n') || 'None';
            const maybes = event.maybes.map(id => `<@${id}>`).join('\n') || 'None';
            const declined = event.declined.map(id => `<@${id}>`).join('\n') || 'None';

            const newEmbed = new EmbedBuilder(reaction.message.embeds[0])
                .setFields(
                    { name: 'Event Type', value: event.eventType, inline: true },
                    { name: 'Start Time', value: `<t:${Math.floor(event.startTime.getTime() / 1000)}:F>`, inline: true },
                    { name: 'Max Attendees', value: event.maxAttendees.toString(), inline: true },
                    { name: `✅ Attendees (${event.attendees.length})`, value: attendees, inline: false },
                    { name: `❔ Maybes (${event.maybes.length})`, value: maybes, inline: false },
                    { name: `❌ Declined (${event.declined.length})`, value: declined, inline: false }
                );

            await reaction.message.edit({ embeds: [newEmbed] });
        };

        const removeUserFromAllLists = () => {
            event.attendees = event.attendees.filter(id => id !== user.id);
            event.maybes = event.maybes.filter(id => id !== user.id);
            event.declined = event.declined.filter(id => id !== user.id);
        }

        if (reaction.emoji.name === '✅') {
            removeUserFromAllLists();
            if (event.attendees.length < event.maxAttendees) {
                event.attendees.push(user.id);
            } else {
                reaction.users.remove(user.id);
                member.send({ content: "Sorry, this event is full." });
            }
        } else if (reaction.emoji.name === '❔') {
            removeUserFromAllLists();
            event.maybes.push(user.id);
        } else if (reaction.emoji.name === '❌') {
            removeUserFromAllLists();
            event.declined.push(user.id);
        } else {
            return;
        }

        await event.save();
        await updateAttendees();
    },
};