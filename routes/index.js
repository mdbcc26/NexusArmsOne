const express = require('express');
const router = express.Router();
//const userController = require('../controllers/userController.js');
const userModel = require('../models/userModel.js');
const authentication = require('../services/authentication.js');

router.get('/', (req,res) => {
    res.render('index', {title: 'the NIMM Project'});
    //res.send('Hello from the index router!')
});

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

router.get('/chat', (req,res) =>{
    res.render('chat')
});

router.route('/login')
    .get((req, res, next) => {
        res.render('login');
    })
    .post((req, res, next) => {
    userModel.getUsers()
        .then(users => {
            authentication.authenticateUser(req.body, users, res);
        })
        .catch(err => res.sendStatus(500))
    });


router.get ('/logout', (req, res, next) =>{
    res.cookie('accessToken', '', {maxAge: 0});
    res.redirect('/')
});

router.route('/register')
    .get((req, res, next) => {
        res.render('register');
    })
    .post( (req, res, next) => {
        const { name, surname, hero, email, info, password } = req.body;

        if (!name || !surname || !hero || !email || !info || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        userModel.addUser({ name, surname, hero, email, info, password })
            //.then(result => res.status(201).json(result))
            .then(result => {
                res.redirect('/')
            })
            .catch(err => next(err));
    });

module.exports = router;

/*Examples for routing
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
*/
/* Examples for GET and POST requests
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
});
*/