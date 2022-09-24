const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

router.get('/health', (req, res) => {
  res.status(200).send('Ok');
});

module.exports = router;
