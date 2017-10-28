const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const twilio = require('twilio');
const passport = require('passport');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();



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
app.use(passport.initialize());
app.use(passport.session());



app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

require('./routes/sms')(app);
require('./routes/call')(app);

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


/*
const familyRoute= require('./routes/family');
const billRoute=require('./routes/bill');
const caseRoute=require('./routes/caseWorker');
const textRoute=require('./routes/text');
*/






app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 8080;
app.listen(PORT);
