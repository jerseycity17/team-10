const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseWorkerSchema = new Schema({
  caseWorkerId: Number,
  familyId: Number,
  affiliate: String,
  price: Number,
  phone: String
});

module.exports = mongoose.model('caseWorker', caseWorkerSchema);
