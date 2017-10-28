const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  caseWorkerId: Number,
  houseHead: String,
  primaryPhone: String,
  secondaryPhone: String,
  email: String,
  employment: Boolean,
  placeOfStay: String,
  wage: Number,
  graduated: Boolean
});

module.exports = mongoose.model('family', familySchema);
