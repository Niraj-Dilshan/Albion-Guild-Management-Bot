const mongoose = require('mongoose');

const guildBankItemSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
});

guildBankItemSchema.index({ guildId: 1, itemName: 1 }, { unique: true });

module.exports = mongoose.model('GuildBankItem', guildBankItemSchema);