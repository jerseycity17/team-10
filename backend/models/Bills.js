const mongoose = require('mongoose');
const { Schema } = mongoose;

const billsSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  familyId: Number,
  bill: String,
  price: Number
});

mongoose.model('bills', billsSchema);
