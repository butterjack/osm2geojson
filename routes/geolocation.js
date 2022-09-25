const express = require('express');
const router = express.Router();

const goeLocationService = require('../services/geolocation')

router.get('/', goeLocationService.getGeoJsonLocation);

module.exports = router;