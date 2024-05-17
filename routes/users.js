const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticationService = require('../services/authentication');

router.use();

// get all users
router.get('/', userController.getUsers);
// get specific user
router.get('/:id', userController.getUser);
// delete user
router.post('/:id', userController.deleteUser)

/*
router.get('/', (req,res) => {
    res.send('Hello from the users router!')
});

router.get('/:id', (req, res) => {
    console.log(req.params);
    res.send('You requested user with id: ' + req.params.id)
})
*/

module.exports = router;