module.exports = function(app) {
  var textControl = require('../controllers/textController');

  app.route('/text/:primePhoneId')
    .get(textControl.get_texts);

};
