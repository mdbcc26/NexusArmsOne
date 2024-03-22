const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World! From the users router');
});

router.get('/:id', (req, res) => {
    console.log(req.params);
    res.send('Respond with the infos for the user with id ' + req.params.id);
});


module.exports = router;