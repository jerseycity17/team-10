const mongoose = require('mongoose');
const { Schema } = mongoose;

const billsSchema = new Schema({
  familyId: Number,
  bill: String,
  price: Number
});

mongoose.model('bills', billsSchema);
