const mongoose = require('mongoose');
const { Schema } = mongoose;

const caseWorkerSchema = new Schema({
  caseWorkerId: Number,
  familyId: Number,
  affiliate: String,
  price: Number
});

mongoose.model('caseWorker', caseWorkerSchema);
