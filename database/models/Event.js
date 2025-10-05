const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    messageId: { type: String, required: false, unique: true, sparse: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventType: { type: String, required: true },
    startTime: { type: Date, required: true },
    maxAttendees: { type: Number, required: true, min: [1, 'The maximum number of attendees must be at least 1.'] },
    attendees: { type: [String], default: [] },
    maybes: { type: [String], default: [] },
    declined: { type: [String], default: [] },
    creator: { type: String, required: true },
    reminderSent: { type: Boolean, default: false },
});

eventSchema.index({ startTime: 1, guildId: 1 });
eventSchema.index({ messageId: 1 });

module.exports = mongoose.model('Event', eventSchema);