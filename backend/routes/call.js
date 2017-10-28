const twilio = require('twilio');

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

    let number= "";
    let caseId="";
    //The function below will search for the case worker of whos calling
    //if it cant find one, it will call a default number
    //which in this case is the variable syedNumber
    family.find({phone: req.body.From}, (err, caseWorkerId) => {
      if(err)
        return console.log(err);
      caseId=caseWorkerId.caseWorkerId;
    });
    worker.find({caseWorkerId: caseId}, (err, phone)=>{
      if(err)
        return console.log(err);
      number=phone.phone;
    });


    const response = new voiceResponse();
    console.log(response);
    const dial=response.dial();
    dial.number(number||syedNumber);
    res.send(response.toString());
  });

  //for know,
  //in the future(in like 4-5 hours)
  //the robotic message should be send thru req.body
  app.post('/sendcall',(req,res)=>{
    console.log(req.body.text);
    let message =req.body.text;
    message=message.replace(/ /g,"%20");
    const xmlURL= ['http://twimlets.com/echo?Twiml=%3CResponse%3E%0A%3CSay%20voice%3D%22alice%22%3E','%3C%2FSay%3E%0A%3C%2FResponse%3E&'];
    const finalxml=xmlURL[0]+message+xmlURL[1];
    twilioClient.api.calls.create({
      url: finalxml,
      to: req.body.phone,  // Text this number
      from: keys.number
  })
  res.send();
})
};
