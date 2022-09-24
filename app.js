const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({ extended: true }));

module.exports = app;
