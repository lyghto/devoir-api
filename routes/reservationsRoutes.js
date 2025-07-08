const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationsController');

// Créer une réservation
router.post('/catways/:id/reservations', reservationController.createReservation);

// Lister toutes les réservations pour un catway
router.get('/catways/:id/reservations', reservationController.getAllReservations);


// Modifier une réservation
router.put('/catways/:id/reservations/:idReservation', reservationController.updateReservation);

router.get('/reservations', reservationController.getAllReservationsGlobal);

router.delete('/reservations/:idReservation', reservationController.deleteReservation);

module.exports = router;