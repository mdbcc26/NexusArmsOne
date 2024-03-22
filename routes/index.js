const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello from the index router!')
});

const cbC1 = (req, res, next) => {
    console.log('this is cbC1');
    next();
};
const cbC2 = (req, res, next) => {
    console.log('this is cbC2');
    next();
};
const cbC3 = (req, res) => {
    res.send('this is cbC3');
};
router.get('/example/c', [cbC1, cbC2, cbC3]);

router.route('/tony/picture')
    .get((req, res) => {
        res.send('GET request for /tony/picture')
    })
    .post((req, res) => {
        res.send('POST request for /tony/picture')
    })

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('recieved a POST request')
})


module.exports = router;