/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

/* GET map. */
router.get('/', (req, res, next) => {
  res.render('map');
});

module.exports = router;
