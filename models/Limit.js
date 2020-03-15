const mongoose = require('mongoose');

const limitSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  bet: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coordinators',
    required: true
  },
  game: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('limits', limitSchema);
