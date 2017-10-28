const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billsSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  familyId: Number,
  bill: String,
  price: Number
});


module.exports = mongoose.model('bills', billsSchema);
