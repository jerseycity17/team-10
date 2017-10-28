const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
      local: {
        email: String,
        password: String,
        id: String
      }
  });

  module.exports = mongoose.model('users', userSchema);
