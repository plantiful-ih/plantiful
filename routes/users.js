/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MyPlant = require('../models/MyPlant');
const User = require('../models/User');
const Plant = require('../models/Plant');
const checkIfLoggedIn = require('../middlewares/auth');

/* Get profile page with user info */
router.get('/profile', checkIfLoggedIn, (req, res, next) => {
  try {
    const user = req.session.currentUser;
    res.render('auth/profile', { user });
  } catch (error) {
    next(error);
  }
});

/* GET edit profile */
router.get('/profile/edit', checkIfLoggedIn, (req, res, next) => {
  try {
    const user = req.session.currentUser;
    console.log(user);
    res.render('auth/edit', { user });
  } catch (error) {
    next(error);
  }
});

/* GET myGarden view. */
router.get('/mygarden', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { _id } = req.session.currentUser;
    const user = await User.findOne({ _id }).populate('userPlants');
    res.render('mygarden', { user });
  } catch (error) {
    next(error);
  }
});

/* GET myGarden add form view */
router.get('/mygarden/add', (req, res) => {
  Plant.find()
    .then((plants) => {
      res.render('addmyplant', { plants });
    })
    .catch((error) => {
      throw error;
    });
});

/* POST myGarden send form information */

router.post('/mygarden/add', checkIfLoggedIn, async (req, res, next) => {
  const {
    nickname, rating, shoppingPoint, typePlant,
  } = req.body;
  const { _id } = req.session.currentUser;
  console.log('user is:', _id);
  if (nickname === '' || rating === '' || shoppingPoint === '') {
    res.render('/mygarden/add', { error: 'Please fill all fields before submitting' });
  } else {
    try {
      const plant = await MyPlant.create({
        nickname, rating, shoppingPoint, typePlant,
      });
      const userUpdate = await User.findByIdAndUpdate(_id, {
        $push: { userPlants: plant._id },
      }, { new: true }).populate('userPlants');
      req.session.currentUser = userUpdate;
      res.redirect('/mygarden');
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
