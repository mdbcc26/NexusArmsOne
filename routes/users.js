const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

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