const express = require('express');
const VoiceRecordController = require('../../../controllers/VoiceRecordController');
const AuthWare = require('../../../middlewares/AuthWare');
const LikeController = require('../../../controllers/LikeController');

const voiceRouter = express.Router();
voiceRouter.use(AuthWare.verify_token)
voiceRouter.post('/', VoiceRecordController.create);
voiceRouter.get('/', VoiceRecordController.index);

//like
voiceRouter.post('/like/:id', LikeController.create);



module.exports = voiceRouter;