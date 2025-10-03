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
    try {
      const now = moment();
      const upcomingEvents = await Event.find({
        startTime: { $gt: now.toDate(), $lt: moment(now).add(15, 'minutes').toDate() },
        reminderSent: { $ne: true },
      });

      for (const event of upcomingEvents) {
          try {
              const guild = await client.guilds.fetch(event.guildId);
              const channel = guild.channels.cache.get(event.channelId) || await guild.channels.fetch(event.channelId);

              if (channel && channel.isTextBased()) {
                  const attendees = event.attendees.map(id => `<@${id}>`).join(' ');
                  if (attendees) {
                      await channel.send(`**Reminder:** The event **${event.title}** is starting in approximately 15 minutes! ${attendees}`);
                      
                      await Event.findByIdAndUpdate(event._id, { reminderSent: true });
                  }
              }
          } catch (error) {
              console.error(`Could not send reminder for event ${event.title}:`, error);
          }
      }
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
    }
  }, 60000); // Check every minute
});
