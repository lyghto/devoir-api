const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwaysController');

// Récupérer tous les catways
router.get('/', catwayController.getAllCatways);

// Récupérer un catway par ID
router.get('/:id', catwayController.getCatwayById);

// Créer un nouveau catway
router.post('/', catwayController.createCatway);

// Mettre à jour un catway par ID
router.put('/:id', catwayController.updateCatway);

// Supprimer un catway par ID
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;