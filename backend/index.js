const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const twilio = require('twilio');
const passport = require('passport');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();

const user = require('./models/User');
const Bill = require('./models/Bills');
const worker = require('./models/CaseWorker');
const family = require('./models/Family');
const text = require('./models/Text')
const familyRoute= require('./routes/family');
const smsresponse = twilio.twiml.MessagingResponse;

require('./services/passport')(passport);

mongoose.connect(keys.mongoURI);

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.send('ERROR::::: You are not Logged in ');
};

app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/bill', (req, res) => {
  const newBill = new Bill();
  newBill.familyId = req.body.familyId;
  newBill.bill = req.body.bill;
  newBill.price = req.body.price;
  newBill.save(err => {
    if (err)
      console.log(err);
  });
  res.send({
    success: true
  });
});

app.route('/profile',isLoggedIn, familyRoute);

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));


app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));


app.use(
  cookieSession({
    maxAge: (30 * 24 * 3600 * 1000),
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/sms')(app);
require('./routes/call')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT);
