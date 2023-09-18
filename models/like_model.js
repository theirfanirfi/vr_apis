const mongoose = require('mongoose');
const LikeEntity = require('../entities/like_entity');
const { Schema } = mongoose;

const likeSchema = new Schema(LikeEntity);
module.exports = mongoose.model('Like', likeSchema);