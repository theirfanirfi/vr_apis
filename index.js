const express = require('express');
var multer = require('multer');
var upload = multer();

const app = express();
const connectDatabase = require('./config');
const bodyParser = require('body-parser');

require('dotenv').config();

connectDatabase(process.env.MONGODB_URL);

app.use(bodyParser.json());
app.use(upload.array());
const router = require('./apis/v1/');

app.use('/api/v1/', router);


app.listen(process.env.PORT, function(){console.log('list')});