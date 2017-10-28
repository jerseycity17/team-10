const mongoose = require('mongoose');
const { Schema } = mongoose;

const textSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  primaryPhone: String,
  text: String
});

mongoose.model('text', textSchema);
