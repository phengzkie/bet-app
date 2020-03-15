const mongoose = require('mongoose');

const townSchema = mongoose.Schema({
  provinceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'provinces'
  },
  province: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('towns', townSchema);
