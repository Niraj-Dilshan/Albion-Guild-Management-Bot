const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    messageId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventType: { type: String, required: true },
    startTime: { type: Date, required: true },
    maxAttendees: { type: Number, required: true },
    attendees: { type: [String], default: [] },
    maybes: { type: [String], default: [] },
    declined: { type: [String], default: [] },
    creator: { type: String, required: true },
});

module.exports = mongoose.model('Event', eventSchema);