const express = require('express');
const router = express.Router();

//importing routers
const userRouter = require('./user/');
const authRouter = require('./auth/');
const voiceRouter = require('./voice/');
const conversationRouter = require('./conversation/');
const profileRouter = require('./profile/');


//registering routers to respective root endpoints
router.use('/user/', userRouter)
router.use('/auth/', authRouter)
router.use('/voice/', voiceRouter)
router.use('/conversation/', conversationRouter)
router.use('/profile/', profileRouter);



module.exports = router;