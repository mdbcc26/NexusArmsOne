const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticationService = require('../services/authentication');

router.use(authenticationService.authenticateJWT)

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);
router.post('/:id/', userController.updateUser);
router.delete('/:id/', userController.deleteUser);

router.get('/:id/edit', userController.editUser);

module.exports = router;