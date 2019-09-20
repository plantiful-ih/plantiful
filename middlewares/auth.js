const checkIfLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
};

const checkIfNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    res.redirect('/mygarden');
  }
};

module.exports = { checkIfLoggedIn, checkIfNotLoggedIn };
