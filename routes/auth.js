/* eslint-disable no-console */
const express = require('express');
const bcrypt = require('bcrypt');

/* User model */
const User = require('../models/User');

const bcryptSalt = 10;


const router = express.Router();

/* Get Home page */
router.get('/', (req, res) => {
  res.render('index', { title: 'Auth' });
});

/* Get Sign up page */
router.get('signup', (req, res) => {
  res.render('signup');
});

/* Create a User */
router.post('/signup', (req, res, next) => {
  const { userEmail, hashedPassword } = req.body;

  /* Form validation */
  if (userEmail !== '' || hashedPassword !== '') {
    User.findOne({ userEmail })
      .then((email) => {
        if (email) {
          console.log('this email already exists');
          res.render('signup', { error: 'email ya existe' });
        } else {
          console.log('email doesnt exists', email);
          /* Password encryptation */
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(hashedPassword, salt);
          /* New user */
          User.create({ userEmail, hashPass })
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
        res.render('signup', { error: 'error try again' });
      });
  } else {
    res.render('signup', { error: 'all the fields must be filled' })
  }
});

/* Get Login page */
router.get('/login', (req, res) => {
  res.render('login');
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
            res.redirect('/plants');
          } else {
            // password invalido
            res.render('login', { error: 'usuario o contraseña incorrectos' });
          }
        } else {
          res.redirect('/signup');
        }
      })
      .catch(() => {
        res.render('login', { error: 'error vuelve a intentarlo' });
      });
  } else {
    res.render('login', { error: 'campos no pueden estar vacios' });
  }
});

module.exports = router;
