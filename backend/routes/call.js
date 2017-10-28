const twilio = require('twilio');

var user = require('../models/User');
var Bill = require('../models/Bills');
var worker = require('../models/CaseWorker');
var family = require('../models/Family');
var text = require('../models/Text');
const keys = require('../config/keys');
const voiceResponse = twilio.twiml.VoiceResponse;
const syedNumber = "347-801-3874";
module.exports = (app)=> {
  var twilioClient = new twilio(keys.TwilioSID, keys.Twiliotoken);
  app.post('/call', (req, res) => {
    const response = new voiceResponse();
    const dial=response.dial();
    dial.number(syedNumber);
    res.send(response.toString());
  });

  //for know,
  //in the future(in like 4-5 hours)
  //the robotic message should be send thru req.body
  app.post('/sendcall',(req,res)=>{
  twilioClient.api.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: req.body.phone,  // Text this number
      from: keys.number
  })
})
};
