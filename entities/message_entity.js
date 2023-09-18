let mongoose = require('mongoose');
let MessageEntity = {
    conversation_id: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    is_shared: {
        type: Boolean,
        required: true,
        default: false,
    },
    voice_record: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VoiceRecord'
    },
    message_voice_record: {
        type: String,
        required: true,
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
module.exports = MessageEntity