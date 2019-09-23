/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const MyPlant = require('../models/MyPlant');
const User = require('../models/User');
// const Plant = require('../models/Plant');
const { checkIfLoggedIn } = require('../middlewares/auth');
const uploadCloud = require('../config/cloudinary');

/* Get profile page with user info */
router.get('/', checkIfLoggedIn, (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const numberOfPlants = user.userPlants.length;
    const active = { profile: true };
    res.render('auth/profile', { user, numberOfPlants, active });
  } catch (error) {
    next(error);
  }
});

/* GET edit profile */
router.get('/edit', checkIfLoggedIn, uploadCloud.single('photo'), (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const active = { profile: true };
    console.log(user);
    res.render('auth/edit', { user, active });
  } catch (error) {
    next(error);
  }
});

// /* POST edit profile */
router.post('/edit', checkIfLoggedIn, uploadCloud.single('photo'), async (req, res, next) => {
  const {
    username, mail, age, location,
  } = req.body;
  const { _id } = req.session.currentUser;
  const imgPath = req.file.url;
  console.log(imgPath);
  try {
    const userUpdate = await User.findByIdAndUpdate(_id, {
      userName: username,
      userEmail: mail,
      age,
      location,
      image: imgPath,
    }, { new: true });
    req.session.currentUser = userUpdate;
    req.flash('success', 'Updated');
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
