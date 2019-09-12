const express = require('express');
const User = require('../models/User');
const bcryptSalt = 10;
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const checkIfLoggedIn = require('../middlewares/auth');

/* GET users listing. */
router.get('/mygarden', checkIfLoggedIn, (req, res, next) => {
  try {
    const user = req.session.currentUser;
    res.render('mygarden', { user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
