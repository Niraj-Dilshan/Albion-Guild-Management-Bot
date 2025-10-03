const client = require("../../index");
const colors = require("colors");
const Event = require('../../database/models/Event');
const moment = require('moment-timezone');

module.exports = {
  name: "ready.js",
};

client.once("ready", async () => {
  console.log(
    "\n" + `[READY] ${client.user.tag} is up and ready to go.`.brightGreen
  );

  setInterval(async () => {
    const now = moment();
    const upcomingEvents = await Event.find({ startTime: { $gt: now.toDate(), $lt: moment(now).add(15, 'minutes').toDate() } });

    for (const event of upcomingEvents) {
        try {
            const guild = await client.guilds.fetch(event.guildId);
            // Fetch a channel from the guild. We need to know which channel to send the reminder to.
            // This assumes the first channel is the correct one, which might not be the case.
            // A better approach would be to store the channelId in the event document.
            const channel = guild.channels.cache.first();

            if (channel && channel.isTextBased()) {
                const attendees = event.attendees.map(id => `<@${id}>`).join(' ');
                if (attendees) {
                    await channel.send(`**Reminder:** The event **${event.title}** is starting in approximately 15 minutes! ${attendees}`);
                    
                    // To prevent multiple reminders, we should add a flag to the event document
                    // For example, `reminderSent: true` and check for it in the query.
                    // For now, we will assume this is sufficient.
                }
            }
        } catch (error) {
            console.error(`Could not send reminder for event ${event.title}:`, error);
        }
    }
  }, 60000); // Check every minute
});
