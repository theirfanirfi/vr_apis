const express = require('express');
const FollowController = require('../../../controllers/FollowController');
const AuthWare = require('../../../middlewares/AuthWare');
const followRouter = express.Router();

followRouter.use(AuthWare.verify_token);

followRouter.get('/:username', FollowController.followUnFollow);



module.exports = followRouter;