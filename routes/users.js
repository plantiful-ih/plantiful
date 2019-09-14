/* eslint-disable no-console */
const express = require('express');
const User = require('../models/User');
const bcryptSalt = 10;
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const checkIfLoggedIn = require('../middlewares/auth');

/* GET myGarden view. */
router.get('/mygarden', checkIfLoggedIn, (req, res, next) => {
  try {
    const user = req.session.currentUser;
    res.render('mygarden', { user });
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

/* POST edit profile */
// router.post('/profile/edit', checkIfLoggedIn, (req, res, next) => {
//   const {
//     username, mail, age, location,
//   } = req.body;
//   const user = req.session.currentUser;
//   // eslint-disable-next-line no-underscore-dangle
//   User.update({ _id: user._id }, {
//     $set: {
//       username, mail, age, location,
//     },
//   }, { new: true })
//     .then((userUpdated) => {
//       console.log(userUpdated);
//       res.redirect('/profile');
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// /* POST edit profile */
router.post('/profile/edit', checkIfLoggedIn, async (req, res, next) => {
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
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
