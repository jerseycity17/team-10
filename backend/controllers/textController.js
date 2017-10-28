const mongoose = require('mongoose');
var Text = require('../models/Text');

exports.get_texts = function(req, res){
  Text.find( {primaryPhone: req.params.primePhoneId}, function(err, task){
    if(err) return console.log(err);
    res.send(task);
  });
};
