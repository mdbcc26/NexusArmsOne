const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

router.get('/:id/edit', userController.editUser);
router.get('/:id/', userController.updateUser);

module.exports = router;