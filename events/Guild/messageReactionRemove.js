const Event = require('../../database/models/Event');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageReactionRemove',
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

        if (reaction.emoji.name === '✅') {
            event.attendees = event.attendees.filter(id => id !== user.id);
        } else if (reaction.emoji.name === '❔') {
            event.maybes = event.maybes.filter(id => id !== user.id);
        } else if (reaction.emoji.name === '❌') {
            event.declined = event.declined.filter(id => id !== user.id);
        } else {
            return;
        }

        await event.save();
        await updateAttendees();
    },
};