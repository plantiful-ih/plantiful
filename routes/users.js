/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const MyPlant = require('../models/MyPlant');
const User = require('../models/User');
// const Plant = require('../models/Plant');
const { checkIfLoggedIn } = require('../middlewares/auth');

/* Get profile page with user info */
router.get('/', checkIfLoggedIn, (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const numberOfPlants = user.userPlants.length;
    res.render('auth/profile', { user, numberOfPlants });
  } catch (error) {
    next(error);
  }
});

/* GET edit profile */
router.get('/edit', checkIfLoggedIn, (req, res, next) => {
  try {
    const user = req.session.currentUser;
    console.log(user);
    res.render('auth/edit', { user });
  } catch (error) {
    next(error);
  }
});

// /* POST edit profile */
router.post('/edit', checkIfLoggedIn, async (req, res, next) => {
  const {
    username, mail, age, location,
  } = req.body;
  const { _id } = req.session.currentUser;
  console.log('user is:', _id);
  try {
    const userUpdate = await User.findByIdAndUpdate(_id, {
      userName: username,
      userEmail: mail,
      age,
      location,
    }, { new: true });
    req.session.currentUser = userUpdate;
    req.flash('GOOD', 'Updated', '/profile');
    // res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
