const mongoose = require('mongoose');

const betSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  sender: {
    type: Number,
    required: true
  },
  game: {
    type: String,
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
  amount: {
    type: Number,
    required: true
  },
  collector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collectors'
  },
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coordinators'
  },
  location: {
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'stations'
    },
    town: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'towns'
    },
    province: {
      type: String
    }
  },
  isWinner: {
    type: Boolean,
    default: false
  },
  winning: {
    type: Number,
    default: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('bets', betSchema);
