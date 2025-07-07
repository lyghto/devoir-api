const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  boatName: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.startDate;
      },
      message: 'La date de fin doit être supérieure ou égale à la date de début',
    },
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);