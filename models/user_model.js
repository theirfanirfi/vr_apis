const mongoose = require('mongoose');
const UserEntity = require('../entities/user_entity');
const { Schema } = mongoose;

const userSchema = new Schema(UserEntity);
module.exports = mongoose.model('User', userSchema);