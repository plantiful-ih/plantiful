/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const data = require('../data');
const Plant = require('../models/Plant');
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  Plant.find()
    .then(() => {
      data.forEach((plant) => {
        console.log(plant.commonName);
      });
      res.render('index', { title: 'Plantiful', data });
    })
    .catch((err) => {
      console.log('Error while displaying homepage', err);
    });
});

router.get('/profile', (req, res, next) => {
  // const { userId } = req.params;

  User.findById()
    .then((user) => {
      if (user) {
        res.render('profile', { title: 'profile', user: req.user });
      } else {
        const error = new Error('There seems to be a mistake');
        Error.status = 404;
        throw error;
      }
    })
    .catch(next);
});

module.exports = router;
