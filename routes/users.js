const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticationService = require('../services/authentication');

router.use(authenticationService.authenticateJWT)

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);
router.delete('/:id/', userController.deleteUser);

router.get('/:id/edit', userController.editUser);
router.post('/:id/update', userController.updateUser);

module.exports = router;