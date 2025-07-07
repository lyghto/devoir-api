const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationsController');

// Créer une réservation
router.post('/catways/:id/reservations', reservationController.createReservation);

// Lister toutes les réservations pour un catway
router.get('/catways/:id/reservations', reservationController.getAllReservations);

// Récupérer les détails d'une réservation
router.get('/catways/:id/reservations/:idReservation', reservationController.getReservationById);

// Modifier une réservation
router.put('/catways/:id/reservations/:idReservation', reservationController.updateReservation);

// Supprimer une réservation
router.delete('/catways/:id/reservations/:idReservation', reservationController.deleteReservation);

module.exports = router;