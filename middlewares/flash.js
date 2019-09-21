const notifications = () => (req, res, next) => {
  res.locals.errorMessages = req.flash('error');
  res.locals.infoMessages = req.flash('info');
  res.locals.successMessages = req.flash('success');
  res.locals.dangerMessages = req.flash('danger');
  res.locals.warningMessages = req.flash('warning');
  next();
};

module.exports = notifications;
