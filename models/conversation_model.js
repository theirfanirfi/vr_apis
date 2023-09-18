const mongoose = require('mongoose');
const ConversationEntity = require('../entities/conversation_entity');
const { Schema } = mongoose;

const conversationSchema = new Schema(ConversationEntity);
module.exports = mongoose.model('Conversation', conversationSchema);