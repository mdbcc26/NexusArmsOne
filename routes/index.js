const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index', {title: 'Express'});

    //res.send('Hello from the index router!')
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

router.get('/cookies', (req,res) => {
    //visit counter and read cookies
    let counter = req.cookies['visitCounter'];
    console.log('Current counter value: ', counter)
    if(isNaN(counter)) counter = 0;
    counter++;
    console.log('New counter value: ', counter)
    //set cookies
    res.cookie('visitCounter', counter, {maxAge: 2*60*60*1000})
    res.send('Cookie was set to ' + counter)

    /*read cookies
    console.log(req.cookies);
    //set cookies
    res.cookie('myCookie', 'Hello World')
    res.send('Cookie has been set')
    */
})

module.exports = router;