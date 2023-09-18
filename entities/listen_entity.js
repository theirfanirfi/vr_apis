const mongoose = require('mongoose');
let ListenEntity = {
    // id: {
    //     type: mongoose.Types.ObjectId(),
    //     required: true,
    // },

    vr_id: {
        type: mongoose.Types.ObjectId(),
        ref: 'VoiceRecord',
    },
    user: {
        type: mongoose.Types.ObjectId(),
        ref: 'User',
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
module.exports = ListenEntity