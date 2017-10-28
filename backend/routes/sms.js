const twilio = require('twilio');

var user = require('../models/User');
var Bill = require('../models/Bills');
var worker = require('../models/CaseWorker');
var family = require('../models/Family');
var text = require('../models/Text');
const keys = require('../config/keys');

module.exports = (app,twilioClient)=> {
  var twilioClient = new twilio(keys.TwilioSID, keys.Twiliotoken);

  app.post('/sms', (req, res) => {
  console.log(req.body);
  const number = req.body.From;
  const message = req.body.Body;
  var newText = new text();
  console.log(number);
  console.log(message);
  newText.primaryPhone = number;
  newText.text = message;
  newText.save(function(err) {
    if (err)
      console.log(err);
    });
  });


  app.post('/sendsms',(req,res)=>{
  twilioClient.messages.create({
      body: req.body.message,
      to: req.body.phone,  // Text this number
      from: keys.number
  })
})
};
