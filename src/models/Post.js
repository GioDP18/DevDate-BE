const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: [String], // Array of image filenames
    // Add any additional fields you need for a post
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
