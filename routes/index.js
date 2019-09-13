/* eslint-disable no-console */
const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

/* GET home page. */
router.get('/', (req, res, next) => {
  Plant.find()
    .then((data) => {
      data.forEach((plant) => {
        console.log(plant.commonName);
      });
      res.render('index', { title: 'Plantiful', data });
    })
    .catch((err) => {
      console.log('Error while displaying homepage', err);
    });
});

router.get('/:plantId', (req, res, next) => {
  const { plantId } = req.params;

  Plant.findById(plantId)
    .then((plant) => {
      if (plant) {
        res.render('plantDetail', { plant });
      } else {
        const error = new Error('Oops, no details found.');
        Error.status = 404;
        throw error;
      }
    })
    .catch(next);
});

module.exports = router;
