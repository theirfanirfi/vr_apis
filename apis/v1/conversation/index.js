const express = require('express');
const ConversationController = require('../../../controllers/ConversationController');
const AuthWare = require('../../../middlewares/AuthWare');
const conversationRouter = express.Router();

conversationRouter.use(AuthWare.verify_token);

conversationRouter.get('/', ConversationController.index);
// userRouter.post('/', UserController.create);
// userRouter.put('/', UserController.create);
// userRouter.delete('/', UserController.create);


// userRouter.post('/verify_otp', UserController.verify_otp);



module.exports = conversationRouter;