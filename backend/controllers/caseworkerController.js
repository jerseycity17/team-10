const mongoose = require('mongoose');
var CaseWorker = mongoose.model('caseWorker');

exports.list_all_workers = (req, res) => {
  CaseWorker.find({}, (err, workers) => {
    if(err)
      return console.log(err);
    res.send(workers);
  });
}

exports.list_a_worker = (req, res) => {
  CaseWorker.find({ caseWorkerId: req.params.caseWorkerId }, (err, worker) => {
    if(err)
      return console.log(err);
    res.send(worker);
  });
}

exports.add_a_worker = (req, res) => {
  var newWorker = new CaseWorker();
  newWorker.caseWorkerId = req.body.caseWorkerId;
  newWorker.familyId = req.body.familyId;
  newWorker.affiliate = req.body.affiliate;
  newWorker.price = req.body.price;
  newWorker.save(err => {
    if(err)
      return console.log(err);
  })
  res.send({ success: true });
}
