const mongoose = require('mongoose');
var Bills = mongoose.model('bills');

exports.list_all_bills = (req, res) => {
  Bills.find({}, (err, bills) => {
    if(err)
      return console.log(err);
    res.send(bills);
  });
}

exports.list_someones_bills = (req, res) => {
  Bills.find({familyId: req.params.famId}, (err, bills) => {
    if(err)
      return console.log(err);
    res.send(bills);
  });
}

exports.add_a_bill = (req, res) => {
  var newBill = new Bill();
  newBill.familyId = req.body.familyId;
  newBill.bill = req.body.bill;
  newBill.price = req.body.price;
  newBill.save(err => {
    if(err)
      return console.log(err);
  })
  res.send({ success: true });
}
