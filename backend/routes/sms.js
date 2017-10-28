
module.exports = (app, smsresponse)=> {
  app.post('/sms', (req, res) => {
  const number = req.From;
  const message = req.Body;
  console.log(number);
  console.log(message);
  var newText = new text()
  newText.primaryPhone = number;
  newText.text = message;
  newText.save(function(err) {
    if (err)
      console.log(err);
  });
});
};
