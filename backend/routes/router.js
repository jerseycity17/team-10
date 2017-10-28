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
  familyControl.list_all_families
});

router.post('/family', function(req, res) {
  familyControl.add_family
});

router.get('/family/:famId', function(req, res) {
  familyControl.get_family
});

router.delete('/family/:famId', function(req, res) {
  familyControl.delete_family
});
//-------------------------------------------

//caseWorker routes-------------------------------
router.get('/worker', function(req, res) {
  workerControl.list_all_workers
});

router.post('/worker', function(req, res) {
  workerControl.add_a_worker
});

router.get('/worker/:caseWorkerId', function(req, res) {
  workerControl.list_a_worker
});
//----------------------------------------------

//Bill routes-----------------------------------------
router.get('/bills', function(req, res) {
  billControl.list_all_bills
});

router.get('/bills', function(req, res) {
  billControl.add_a_bill
});

router.get('/bills/:famId', function(req, res) {
  billControl.list_someones_bills

});
//----------------------------------------------------

//Text routes-------------------------------------------------
router.get('/text/:primePhoneId', function(req, res) {
  {
    textControl.get_texts
  }
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
