const mongoose = require('mongoose');
const MessageEntity = require('../entities/message_entity');
const { Schema } = mongoose;

const messageSchema = new Schema(MessageEntity);
module.exports = mongoose.model('Message', messageSchema);