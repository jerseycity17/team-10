var mongoose = require('mongoose');
var passport = require('passport');
require('../services/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var Bills =require('../models/Bills');
var CaseWorker = require('../models/CaseWorker');
var User = require("../models/user");
var Family =require('../models/Family');
var Text = require('../models/Text');


router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please pass username and password.'
    });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Username already exists.'
        });
      }
      res.json({
        success: true,
        msg: 'Successful created new user.'
      });
    });
  }
});

// Template //
// router.get('/URL', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {  } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });

//Family routes------------------
router.get('/family', function(req, res) {
  Family.find({}, function(err, task) {
    if (err) return console.log(err);
    res.send(task);
  });
});

router.post('/family', function(req, res) {
  var newFamily = new Family();
  newFamily.caseWorkerId = req.body.caseWorkerId;
  newFamily.houseHead = req.body.houseHead;
  newFamily.primaryPhone = req.body.primaryPhone;
  newFamily.secondaryPhone = req.body.secondaryPhone;
  newFamily.email = req.body.email;
  newFamily.employment = req.body.employment;
  newFamily.placeOfStay = req.body.placeOfStay;
  newFamily.graduated = req.body.graduated;

  newFamily.save(function(err) {
    if (err) return console.log(err);
  });
  res.send({
    success: true
  });
});

router.get('/family/:famId', function(req, res) {
  Family.find( {houseHead: req.params.houseHead}, function(err, task){
    if(err) return console.log(err);
    res.send(task);
  });
});

router.delete('/family/:famId', function(req, res) {
  Family.find({houseHead: req.params.famId}, function(err, task){
    if(err) return console.log(err);
    res.send(task);
  });
});
//-------------------------------------------

//caseWorker routes-------------------------------
router.get('/worker', function(req, res) {
  CaseWorker.find({}, (err, workers) => {
    if(err)
      return console.log(err);
    res.send(workers);
  });
});

router.post('/worker', function(req, res) {
  var newWorker = new CaseWorker();
  newWorker.caseWorkerId = req.body.caseWorkerId;
  newWorker.familyId = req.body.familyId;
  newWorker.affiliate = req.body.affiliate;
  newWorker.price = req.body.price;
  newWorker.save(err => {
    if(err)
      return console.log(err);
  })
  res.send({ success: true });

});

router.get('/worker/:caseWorkerId', function(req, res) {
  CaseWorker.find({ caseWorkerId: req.params.caseWorkerId }, (err, worker) => {
    if(err)
      return console.log(err);
    res.send(worker);
      });
});
//----------------------------------------------

//Bill routes-----------------------------------------
router.get('/bills', function(req, res) {
  Bills.find({}, (err, bills) => {
    if(err)
      return console.log(err);
    res.send(bills);
  });
});

router.get('/bills', function(req, res) {
  var newBill = new Bill();
  newBill.familyId = req.body.familyId;
  newBill.bill = req.body.bill;
  newBill.price = req.body.price;
  newBill.save(err => {
    if(err)
      return console.log(err);
  })
  res.send({ success: true });
});

router.get('/bills/:famId', function(req, res) {
  Bills.find({familyId: req.params.famId}, (err, bills) => {
    if(err)
      return console.log(err);
    res.send(bills);
  });

});
//----------------------------------------------------

//Text routes-------------------------------------------------
router.get('/text/:primePhoneId', function(req, res) {
  Text.find( {primaryPhone: req.params.primePhoneId}, function(err, task){
    if(err) return console.log(err);
    res.send(task);
  });
});
//-----------------------------------------------------

// router.get('/U', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {  } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });

//---------------------------------------------------

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      console.log('Not user ')
      res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.validPassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          console.log(isMatch);
          console.log('eer')
          console.log(err);
          // if user is found and password is right create a token
          var token = jwt.sign(user, config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: 'JWT ' + token
          });
        } else {
          console.log('wrong pass')
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});


getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
