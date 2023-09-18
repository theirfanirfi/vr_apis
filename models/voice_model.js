const mongoose = require('mongoose');
const VoiceRecordsEntity = require('../entities/voice_records_entity');
const { Schema } = mongoose;

const voiceRecordsSchema = new Schema(VoiceRecordsEntity);
module.exports = mongoose.model('VoiceRecord', voiceRecordsSchema);