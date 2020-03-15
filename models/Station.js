const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
  townId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'towns'
  },
  town: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('stations', stationSchema);
