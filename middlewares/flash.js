const flashNotificationOptions = {
  beforeSingleRender(item, callback) {
    if (item.type) {
      switch (item.type) {
        case 'GOOD':
          item.type = 'Success';
          item.alertClass = 'alert-success';
          break;
        case 'OK':
          item.type = 'Info';
          item.alertClass = 'alert-info';
          break;
        case 'BAD':
          item.type = 'Error';
          item.alertClass = 'alert-danger';
          break;
      }
    }
    callback(null, item);
  },
};

// alert_class

module.exports = flashNotificationOptions;
