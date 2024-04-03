const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World! From the index.js router');
});


const cbC1 = function (req, res, next ) {
    console.log('cbC1');
    next();
}
const cbC2 = function (req, res, next) {
    console.log('cbC2')
    next()
}
const cbC3 = function (req, res) {
    res.send('Hello from C! (cbC3)')
}
router.get('/example/c', [cbC1, cbC2, cbC3])


router.route('/tony/picture')
    .get((req, res)=> {
        res.send('GET request for the picture of the user "tony"');
    })
    .post((req, res) => {
        res.send('POST request for the picture of the user "tony"');
    })


router.post('/', (req, res) => {
    console.log(req.body);
    res.send('received a POST request');
});

router.get('/cookies', (req, res) => {
    let counter = req.cookies['visitCounter'];
    console.log("Current counter value: " + counter);
    if (isNaN(counter)) counter = 0;
    counter ++;
    console.log("New counter value: " + counter);
    res.cookie('visitCounter', counter,{maxAge:2*60*60*1000});
    res.send('Cookie was set to ' + counter);
});


module.exports = router;