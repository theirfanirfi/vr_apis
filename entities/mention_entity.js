let Mention = {
    // id: {
    //     type: mongoose.Types.ObjectId(),
    //     required: true,
    // },
    vr_id_mentioned: {
        type: String,
        required: true
    },
    user_id_mentioned: {
        type: String,
        required: true,
    },
    user_id_mentioner: {
        type: String,
        required: true,
    },
    vr_id_response: {
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
module.exports = Mention