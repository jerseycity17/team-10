const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const twilio = require('twilio');
const passport = require('passport');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();

var user = require('./models/User');
var Bill = require('./models/Bills');
var worker = require('./models/CaseWorker');
var family = require('./models/Family');
var text = require('./models/Text')

const smsresponse = twilio.twiml.MessagingResponse;
require('./services/passport');

mongoose.connect(keys.mongoURI);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/bill', (req, res) => {
  var newBill = new Bill();
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
require('./routes/authRoutes')(app);
require('./routes/family')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
