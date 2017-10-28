const express =require('express');
const app = express();

module.exports = ()=> {
  var textControl = require('../controllers/textController');

  app.route('/text/:primePhoneId')
    .get(textControl.get_texts);
};
