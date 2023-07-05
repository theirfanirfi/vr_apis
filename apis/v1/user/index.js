const express = require('express');
const UserController = require('../../../controllers/UserController');
const userRouter = express.Router();


userRouter.get('/', UserController.index);



module.exports = userRouter;