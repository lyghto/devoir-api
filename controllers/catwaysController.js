const Catway = require('../models/catwayModel');

/**
 * @desc Obtenir tous les catways
 * @route GET /api/catways
 */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

/**
 * @desc Créer un nouveau catway
 * @route POST /api/catways
 */
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
    await newCatway.save();
    res.status(201).json({ message: 'Catway créé', catway: newCatway });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
};

/**
 * @desc Obtenir un catway par son ID
 * @route GET /api/catways/:id
 */
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

/**
 * @desc Modifier un catway
 * @route PUT /api/catways/:id
 */
exports.updateCatway = async (req, res) => {
  try {
    const updated = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Catway non trouvé' });
    res.status(200).json({ message: 'Catway mis à jour', catway: updated });
  } catch (error) {
    res.status(400).json({ message: 'Erreur de mise à jour', error: error.message });
  }
};

/**
 * @desc Supprimer un catway
 * @route DELETE /api/catways/:id
 */
exports.deleteCatway = async (req, res) => {
  try {
    const deleted = await Catway.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Catway non trouvé' });
    res.status(200).json({ message: 'Catway supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};