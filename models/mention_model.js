const mongoose = require('mongoose');
const Mention = require('../entities/mention_entity');
const { Schema } = mongoose;

const mentionSchema = new Schema(Mention);
module.exports = mongoose.model('Mention', mentionSchema);