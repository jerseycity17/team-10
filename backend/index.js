const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const twilio = require('twilio');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);


//twilio set up
var twilioClient= new twilio(keys.TwilioSID,keys.Twiliotoken);

twilioClient.messages.create({
    body: 'Hello from Node',
    to: '+19294351864',  // Text this number
    from: keys.number
})
.then((message) => console.log(message.sid));

const app = express();

app.use(
  cookieSession({
    maxAge: (30 * 24 * 3600 * 1000),
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
