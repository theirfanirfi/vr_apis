const express = require('express');
const ProfileController = require('../../../controllers/ProfileController');
const AuthWare = require('../../../middlewares/AuthWare');
const profileRouter = express.Router();

profileRouter.use(AuthWare.verify_token);

profileRouter.get('/:username', ProfileController.get);



module.exports = profileRouter;