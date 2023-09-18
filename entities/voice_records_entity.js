const mongoose = require('mongoose');
const User = require('../models/user_model');
const like_model = require('../models/like_model');
let VoiceRecordsEntity = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    voice_record: {
        type: String,
        required: true,
    },
    is_long: {
        type: Boolean,
        required: true,
        default: false,
    },
    is_short: {
        type: Boolean,
        required: true,
        default: false,
    },
    is_mention: {
        type: Boolean,
        required: true,
        default: false,
    },
    hash_tags: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date()
    }
};
module.exports = VoiceRecordsEntity