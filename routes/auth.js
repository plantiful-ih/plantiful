/* eslint-disable no-console */
const express = require('express');
const bcrypt = require('bcrypt');

const bcryptSalt = parseInt(process.env.BCRYPTSALT);
const router = express.Router();
const User = require('../models/User');
const Plant = require('../models/Plant');

const { checkIfNotLoggedIn } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.redirect('/plants');
});

/* Get Sign up page */
router.get('/signup', (req, res) => {
  const active = { profile: true };
  res.render('auth/signup', { active });
});

/* Search results field */
function escapeRegex(text) {
  return text.replace(/[-[\]()*+?.,\\^$|#\s]/g, '\\$&');
}

router.get('/search', (req, res, next) => {
  const { q } = req.query;
  const regex = new RegExp(escapeRegex(q), 'gi');

  Plant.findOne({ commonName: regex })
    .then((plant) => {
      if (plant) {
        console.log(plant);
        res.render('search', { plant, active: { home: true } });
      } else {
        // req.flash('error', 'No plants match that query, please try again.');
        const error = new Error('Sorry, we don\'t have that plant yet');
        Error.status = 404;
        res.render('search', { error });
        throw error;
      }
    })
    .catch((err) => {
      console.log('Error while looking for the plant', err);
    });
});

/* Tags results field */
router.get('/tagged/:place', (req, res, next) => {
  const { place } = req.params;

  Plant.find({ place: { $elemMatch: { $eq: place } } })
    .then((data) => {
      data.forEach((plant) => {
        console.log(plant.commonName);
      });
      res.render('index', {
        title: 'Plantiful', data, active: { home: true }, tagActive: { place: true },
      });
    })
    .catch((err) => {
      console.log('Error while looking for the plant', err);
    });
});

/* Create a User */
router.post('/signup', (req, res) => {
  const { userEmail, password } = req.body;

  /* Form validation */
  if (userEmail !== '' || password !== '') {
    User.findOne({ userEmail })
      .then((email) => {
        if (email) {
          req.flash('error', 'This email is already registered.');
          res.redirect('/signup');
        } else {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashedPassword = bcrypt.hashSync(password, salt);
          User.create({ userEmail, hashedPassword })
            .then(() => {
              req.flash('success', 'New user has been created. Now you can login.');
              res.redirect('/plants');
            })
            .catch((error) => {
              throw error;
            });
        }
      })
      .catch((error) => {
        req.flash('error', 'Error try again.');
        res.redirect('/signup');
      });
  } else {
    req.flash('error', 'All fields must be filled.');
    res.redirect('/signup');
  }
});

/* Get Login page */
router.get('/login', checkIfNotLoggedIn, (req, res) => {
  const active = { profile: true };
  res.render('auth/login', { active });
});

router.post('/login', (req, res) => {
  const { userEmail, password } = req.body;
  if (userEmail !== '' && password !== '') {
    User.findOne({ userEmail })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.hashedPassword)) {
            req.session.currentUser = user;
            console.log(user);
            req.flash('success', 'You are connected with your plants 🎉.');
            res.redirect('/mygarden');
          } else {
            req.flash('error', 'Wrong email or password.');
            res.redirect('/login');
          }
        } else {
          req.flash('error', 'User does not exist, please sign up.');
          res.redirect('/signup');
        }
      })
      .catch(() => {
        req.flash('error', 'There was an error. Please try again.');
        res.redirect('/login');
      });
  } else {
    req.flash('error', 'All fields must be filled');
    res.redirect('/login');
  }
});

/* Get logout page */
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
