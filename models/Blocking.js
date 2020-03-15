const mongoose = require('mongoose');

const blockSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  bet: {
    type: String,
    required: true
  },
  location: {
    province: {
      type: String
    }
  }
});

module.exports = mongoose.model('blocking', blockSchema);
