const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Auth' });
});

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
