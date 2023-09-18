const mongoose = require('mongoose');
let UserEntity = {
    // id: {
    //     type: mongoose.Types.ObjectId(),
    //     required: true,
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        lowercase: true
    },
    profile_image: {
        type: String,
        required: false,
    },
    profile_description: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    country_code: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
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