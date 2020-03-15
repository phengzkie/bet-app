const mongoose = require('mongoose');

const coordinatorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stations'
  },
  station: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('coordinators', coordinatorSchema);
