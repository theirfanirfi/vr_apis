const express = require('express');
const router = express.Router();

//importing routers
const userRouter = require('./user/');


//registering routers to respective root endpoints
router.use('/user/', userRouter)



module.exports = router;