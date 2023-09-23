const mongoose = require('mongoose');

let FollowEntity = {
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    followed_id: {
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
module.exports = FollowEntity