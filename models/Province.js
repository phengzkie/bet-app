const mongoose = require('mongoose');

const provinceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('provinces', provinceSchema);
