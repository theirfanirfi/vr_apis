const express = require('express');
const UserController = require('../../../controllers/UserController');
const AuthController = require('../../../controllers/AuthController');


const authRouter = express.Router();


authRouter.post('/signin', AuthController.signin);
authRouter.post('/signup', UserController.create);


authRouter.post('/verify_otp', UserController.verify_otp);



module.exports = authRouter;