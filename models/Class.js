const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
