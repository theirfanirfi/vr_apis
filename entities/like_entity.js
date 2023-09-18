const mongoose = require('mongoose');
let LikeEntity = {
    // id: {
    //     type: mongoose.Types.ObjectId(),
    //     required: true,
    // },
    vr_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
module.exports = LikeEntity