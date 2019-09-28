/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const Plant = require('../models/Plant');

/* GET home page. */
router.get('/', (req, res) => {
  console.log('Select status:', req.body);
  Plant.find()
    .then((data) => {
      data.forEach((plant) => {
        console.log(plant.commonName);
        console.log('Plantiful plants:', data.length);
      });
      res.render('index', { title: 'Plantiful', data, active: { home: true } });
    })
    .catch((err) => {
      console.log('Error while displaying homepage', err);
    });
});

/* GET plant view */
router.get('/:plantId', (req, res, next) => {
  const { plantId } = req.params;

  Plant.findById(plantId)
    .then((plant) => {
      if (plant) {
        res.render('plantDetail', { plant, active: { home: true } });
      } else {
        const error = new Error('Oops, no details found.');
        Error.status = 404;
        throw error;
      }
    })
    .catch(next);
});


module.exports = router;
