const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const twilio = require('twilio');
const passport = require('passport');
const smsresponse= twilio.twiml.MessagingResponse;
const morgan = require('morgan');
const bodyParser= require('body-parser');
const keys = require('./config/keys');
//require('./models/User');
//require('./services/passport');
const app = express();
mongoose.connect(keys.mongoURI);
var twilioClient= new twilio(keys.TwilioSID,keys.Twiliotoken);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.post('/sms',(req,res)=>{
  const number = req.from;
  const message = req.body;
  
});
//twilio set up

//
// twilioClient.messages.create({
//     body: 'Hello from Node',
//     to: '+19294351864',  // Text this number
//     from: keys.number
// })
// .then((message) => console.log(message.sid));


app.use(
  cookieSession({
    maxAge: (30 * 24 * 3600 * 1000),
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
