const express = require('express');
const UserController = require('../../../controllers/UserController');
const AuthWare = require('../../../middlewares/AuthWare');
const userRouter = express.Router();

// userRouter.use(AuthWare.verify_token);

userRouter.get('/', UserController.index);
userRouter.post('/', UserController.create);
userRouter.put('/', UserController.create);
userRouter.delete('/', UserController.create);


// userRouter.post('/verify_otp', UserController.verify_otp);



module.exports = userRouter;