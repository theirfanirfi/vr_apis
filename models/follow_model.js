const mongoose = require('mongoose');
const FollowerEntity = require('../entities/follower_entity');
const { Schema } = mongoose;

const followerSchema = new Schema(FollowerEntity);
module.exports = mongoose.model('Follower', followerSchema);