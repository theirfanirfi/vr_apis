let mongoose = require('mongoose');
let ConversationEntity = {
    user_one: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user_two: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
module.exports = ConversationEntity