const mongoose = require('mongoose');
const ListenEntity = require('../entities/listen_entity');
const { Schema } = mongoose;

const listenSchema = new Schema(ListenEntity);
module.exports = mongoose.model('listen', listenSchema);