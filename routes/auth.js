/* eslint-disable no-console */
const express = require('express');
const bcrypt = require('bcrypt');

const bcryptSalt = parseInt(process.env.BCRYPTSALT);
const router = express.Router();
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const User = require('../models/User');

router.get('/', (req, res) => {
  res.redirect('/plants');
});

/* Get Sign up page */
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

/* Create a User */
router.post('/signup', (req, res) => {
  const { userEmail, password } = req.body;

  /* Form validation */
  if (userEmail !== '' || password !== '') {
    User.findOne({ userEmail })
      .then((email) => {
        if (email) {
          console.log('this email already exists');
          res.render('auth/signup', { error: 'This email is already registered.' });
        } else {
          console.log('email does not exist', email);
          /* Password encryptation */
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashedPassword = bcrypt.hashSync(password, salt);
          /* New user */
          User.create({ userEmail, hashedPassword })
            .then(() => {
              console.log('new user has been created');
              res.redirect('/');
            })
            .catch((error) => {
              throw error;
            });
        }
      })
      .catch((error) => {
        console.log(error);
        res.render('auth/signup', { error: 'error try again' });
      });
  } else {
    res.render('auth/signup', { error: 'all the fields must be filled' });
  }
});

/* Get Login page */
router.get('/login', (req, res) => {
  res.render('auth/login');
});


router.post('/login', (req, res) => {
  const { userEmail, password } = req.body;
  if (userEmail !== '' && password !== '') {
    User.findOne({ userEmail })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.hashedPassword)) {
            // password valido
            // guardo la session
            req.session.currentUser = user;
            res.redirect('/mygarden');
          } else {
            // password invalido
            res.render('auth/login', { error: 'Wrong email or password.' });
          }
        } else {
          res.redirect('/signup', { error: 'User does not exist, please sign up.' });
        }
      })
      .catch(() => {
        res.render('auth/login', { error: 'There was an error. Please try again.' });
      });
  } else {
    res.render('auth/login', { error: 'All fields must be filled' });
  }
});

/* Get logout page */
router.get('/logout', (req, res, next) => {
  // req.session.currentUser = null;
  req.session.destroy();
  res.redirect('/login');
  // req.session.destroy((err) => {
  //   // cannot access session here
  //   if (err) {
  //     next(err);
  //   }
  //   res.redirect('/login');
  // });
});

module.exports = router;
