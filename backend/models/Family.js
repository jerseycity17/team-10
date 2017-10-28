const mongoose = require('mongoose');
const { Schema } = mongoose;

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

mongoose.model('family', familySchema);
