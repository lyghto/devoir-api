const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationsController');

// Créer une réservation
router.post('/catways/:id/reservations', reservationController.createReservation);

// Lister toutes les réservations pour un catway
router.get('/catways/:id/reservations', reservationController.getAllReservations);


// Modifier une réservation
router.put('/catways/:id/reservations/:idReservation', reservationController.updateReservation);

// Lister toutes les réservations globales (pour tous les catways)
router.get('/reservations', reservationController.getAllReservationsGlobal);

// Supprimer une réservation
router.delete('/reservations/:idReservation', reservationController.deleteReservation);

module.exports = router;