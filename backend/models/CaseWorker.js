const mongoose = require('mongoose');
const { Schema } = mongoose;

const caseWorkerSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  familyId: Number,
  affiliate: String,
  price: Number
});

mongoose.model('caseWorker', caseWorkerSchema);
