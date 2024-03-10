const mongoose = require('mongoose');

const MatchRequestSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'matched', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true });

module.exports = mongoose.model('MatchRequest', MatchRequestSchema);
