const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour les catways.
 * @typedef {Object} Catway
 * @property {Number} catwayNumber - Numéro unique du catway
 * @property {String} catwayType - Type ("long" ou "short")
 * @property {String} catwayState - État de la passerelle
 */
const CatwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro du catway est requis'],
    unique: true,
    min: [1, 'Le numéro doit être supérieur à 0']
  },
  catwayType: {
    type: String,
    required: [true, 'Le type est requis'],
    enum: {
      values: ['long', 'short'],
      message: 'Le type doit être "long" ou "short"'
    }
  },
  catwayState: {
    type: String,
    required: [true, 'L\'état est requis'],
    minlength: [3, 'L\'état doit contenir au moins 3 caractères']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Catway', CatwaySchema);