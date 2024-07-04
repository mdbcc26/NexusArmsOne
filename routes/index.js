const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authenticationService = require('../services/authentication.js');

router.get('/', (req,res) => {
    res.render('index', {title: 'NexusArms'});
});

router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        userController.authenticateUser(req, res);
    });

router.get ('/logout', (req, res) =>{
    res.cookie('accessToken', '', {maxAge: 0});
    res.redirect('/')
});

router.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        userController.addUser(req, res);
    });
router.get('/chat',authenticationService.authenticateJWT, (req,res) =>{
    res.render('chat')
});

module.exports = router;

/*router.get('/cookies', (req,res) => {
    let counter = req.cookies['visitCounter'];
    console.log('Current counter value: ', counter)
    if(isNaN(counter)) counter = 0;
    counter++;
    console.log('New counter value: ', counter)
    res.cookie('visitCounter', counter, {maxAge: 2*60*60*1000})
    res.send('Cookie was set to ' + counter)
})*/