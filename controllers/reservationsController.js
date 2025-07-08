const Catway = require('../models/catwayModel');
const Reservation = require('../models/reservationModel');
const { verifyToken } = require('../controllers/usersController');


exports.getAllReservationsGlobal = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

/**
 * Obtenir toutes les réservations pour un catway
 */
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/**
 * Obtenir une réservation spécifique
 */
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ 
      _id: req.params.idReservation, 
      catwayNumber: req.params.id 
    });
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/**
 * Créer une réservation
 */
exports.createReservation = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    const newReservation = new Reservation({
      ...req.body,
      catwayNumber: catway.catwayNumber,
    });

    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Erreur de création', error });
  }
};

/**
 * Modifier une réservation
 */
exports.updateReservation = async (req, res) => {
  try {
    const updated = await Reservation.findOneAndUpdate(
      { _id: req.params.idReservation, catwayNumber: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Erreur de modification', error });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!deleted) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.status(200).json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
