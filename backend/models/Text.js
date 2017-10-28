const mongoose = require('mongoose');
const { Schema } = mongoose;

const textSchema = new Schema({
  textId: Number,
  primaryPhone: String,
  text: String
});

mongoose.model('text', textSchema);
