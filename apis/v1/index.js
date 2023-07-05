const express = require('express');

const router = express.Router();

router.use('/user/', (req, res) => {res.send('Welcome')})



module.exports = router;