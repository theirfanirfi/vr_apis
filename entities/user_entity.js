let UserEntity = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    is_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    is_password_reset_request: {
        type: Boolean,
        required: false,
        default: false
    },
    is_otp_generated: {
        type: Boolean,
        required: false,
        default: false
    },
    otp_code: {
        type: String,
        required: false,
        default: '-1'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        required: false,
        default: false
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
module.exports = UserEntity