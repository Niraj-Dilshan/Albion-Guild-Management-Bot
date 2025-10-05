const mongoose = require('mongoose');

const guildBankTransactionSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    type: { type: String, required: true, enum: ['deposit', 'withdrawal'] },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

guildBankTransactionSchema.index({ guildId: 1, timestamp: -1 });

module.exports = mongoose.model('GuildBankTransaction', guildBankTransactionSchema);