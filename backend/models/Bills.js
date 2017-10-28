const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billsSchema = new Schema({
  familyId: Number,
  bill: String,
  price: Number
});


module.exports = mongoose.model('bills', billsSchema);
