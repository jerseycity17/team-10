const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
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
const familyRoute= require('./routes/family')b/////;
const smsresponse = twilio.twiml.MessagingResponse;

require('./services/passport')(passport);

mongoose.connect(keys.mongoURI);
//cors control
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(session({
    secret: keys.cookieKey, // session secret
    resave: true,
    saveUninitialized: true
}));


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


app.get('/profile',isLoggedIn, familyRoute);
app.get('/fail',(req,res)=>{
  res.send('User or Password doesnt match. Please try again....')
});
app.get('/failsign',(req,res)=>{
  res.send('User or Password already exist');
});

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/fail', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));


app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/failsign', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));


app.use(passport.initialize());
app.use(passport.session());
require('./routes/sms')(app);
require('./routes/call')(app);
require('./routes/family')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
