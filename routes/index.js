const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Planet Express!'});
})

const cbC1 = (req, res, next) => {
    console.log('This is cbC1!');
    next();
}

const cbC2 = (req, res, next) => {
    console.log('This is cbC2!');
    next();
}

const cbC3 = (req, res) => {
    res.send('This is cbC3!');
}

router.get('/example/c', [cbC1, cbC2, cbC3]);

router.route('/tony/picture')
    .get((req, res) => {
        res.send('got a GET request for /tony/picture')
    })
    .post((req, res) => {
        res.send('got a POST request for /tony/picture')
    })

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('Got your POST request.')
})

router.get('/cookies', (req, res) => {
    let counter = req.cookies['visitCounter'];
    console.log('Current counter value', counter);
    if (isNaN(counter)) counter = 0;
    counter++;
    console.log('New counter value', counter);
    res.cookie('visitCounter', counter, {maxAge: 2 * 60 * 60 * 1000});
    res.send('Cookie was set to ' + counter);
})

module.exports = router;
