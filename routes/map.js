/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const Plant = require('../models/Plant');

/* GET map. */
router.get('/', (req, res, next) => {
  res.render('map');
});

module.exports = router;