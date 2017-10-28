var mongoose = require('mongoose');
var passport = require('passport');
require('../services/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

  //controllers
  var textControl = require('../controllers/textController');
  var familyControl = require('../controllers/familyController');
  var billControl = require('../controllers/billsController');
  var workerControl = require('../controllers/caseworkerController');

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
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
router.get('/family', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { familyControl.list_all_families } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/family', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { familyControl.add_family } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/family/:famId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { familyControl.get_family } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/family/:famId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { familyControl.delete_family } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
//-------------------------------------------

//caseWorker routes-------------------------------
router.get('/worker', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { workerControl.list_all_workers } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/worker', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { workerControl.add_a_worker } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/worker/:caseWorkerId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { workerControl.list_a_worker } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
//----------------------------------------------

//Bill routes-----------------------------------------
router.get('/bills', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { billControl.list_all_bills } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/bills', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { billControl.add_a_bill } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/bills/:famId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { billControl.list_someones_bills } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
//----------------------------------------------------

//Text routes-------------------------------------------------
router.get('/text/:primePhoneId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) { textControl.get_texts } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
//-----------------------------------------------------

router.get('/U', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//---------------------------------------------------

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
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
