const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

const { errorHandler } = require('./middlewares/error');
const healthCheck = require('./utils/health-check');
const geoLocation = require('./routes/geolocation')

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({ extended: true }));

app.use('/', healthCheck);
app.use('/geojson', geoLocation);

app.use(errorHandler);

module.exports = app;
