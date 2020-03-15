const mongoose = require('mongoose');

const collectorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coordinators'
  },
  percentage: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('collectors', collectorSchema);
