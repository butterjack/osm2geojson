const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

const { errorHandler } = require('./middlewares/error');

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({ extended: true }));

app.use(errorHandler);

module.exports = app;
