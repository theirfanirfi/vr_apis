const express = require('express');
const app = express();
const connectDatabase = require('./config');

require('dotenv').config();

connectDatabase(process.env.MONGODB_URL);

const router = require('./apis/v1/');

app.use('/api/v1/', router);


app.listen(process.env.PORT, function(){console.log('list')});