const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello from the users router!')
});

router.get('/:id', (req, res) => {
    console.log(req.params);
    res.send('You requested user with id: ' + req.params.id)
})

module.exports = router;