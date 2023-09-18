let FollowEntity = {
    follower_id: {
        type: String,
        required: true
    },
    followed_id: {
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
module.exports = FollowEntity