const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const private = require('../middlewares/private');

router.get('/:id', private.checkJWT, userController.getUserById);
router.get('/', private.checkJWT, userController.getAllUsers);
router.post('/', userController.add);
router.patch('/:id', private.checkJWT, userController.updateUser);
router.delete('/:id', private.checkJWT, userController.delete);
router.post('/authenticate', userController.authenticate);

module.exports = router;