const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
