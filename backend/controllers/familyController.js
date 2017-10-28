const mongoose = require('mongoose');
var Family = mongoose.model('family');

exports.list_all_families = function(req, res){
  Family.find({}, function(err, task){
    if(err) return console.log(err);
    res.send(task);
  });
}

exports.add_family = function(req, res) {
  var newFamily = new Family();
  newFamily.caseWorkerId = req.body.caseWorkerId;
  newFamily.houseHead = req.body.houseHead;
  newFamily.primaryPhone = req.body.primaryPhone;
  newFamily.secondaryPhone = req.body.secondaryPhone;
  newFamily.email = req.body.email;
  newFamily.employment = req.body.employment;
  newFamily.placeOfStay = req.body.placeOfStay;
  newFamily.graduated = req.body.graduated;

  newFamily.save(function(err){
    if(err) return console.log(err);
  });
  res.send({success: true});
};


exports.get_family = function(req, res){
  Family.find( {houseHead: req.params.houseHead}, function(err, task){
    if(err) return console.log(err);
    res.send(task);
  });
};

exports.delete_family = function(req, res){
  Family.find({houseHead: req.params.famId}, function(err, task){
    if(err) return console.log(err);
    res.send(task);
  });
}

/*
exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/
