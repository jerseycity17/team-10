const mongoose = require('mongoose');
var CaseWorker = mongoose.model('caseWorker');

exports.list_all_workers = (req, res) => {
  CaseWorker.find({}, (err, workers) => {
    if(err)
      return console.log(err);
    res.send(workers);
  });
}

//export.list_a_worker = (req, res)
