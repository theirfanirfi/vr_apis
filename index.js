const express = require('express');
const app = express();

require('dotenv').config();

const router = require('./apis/v1/');

app.use('/api/v1/', router);


app.listen(process.env.PORT, function(){console.log('list')});