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
var twilioClient = new twilio(keys.TwilioSID, keys.Twiliotoken);

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
  res.send({ success: true });
});


//twilio set up



app.use(
  cookieSession({
    maxAge: (30 * 24 * 3600 * 1000),
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/sms')(app,twilioClient);
require('./routes/authRoutes')(app);
require('./routes/family')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
