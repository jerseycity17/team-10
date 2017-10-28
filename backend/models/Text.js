const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  primaryPhone: String,
  text: String
});

module.exports = mongoose.model('text', textSchema);
