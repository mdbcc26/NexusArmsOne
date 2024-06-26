const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel.js');
const authentication = require('../services/authentication.js');

router.get('/', (req,res) => {
    /*const confirmationMessage = req.cookies.confirmationMessage || '';
    res.clearCookie('confirmationMessage');*/
    res.render('index', {title: 'the NIMM Project'});
});

router.get('/cookies', (req,res) => {
    let counter = req.cookies['visitCounter'];
    console.log('Current counter value: ', counter)
    if(isNaN(counter)) counter = 0;
    counter++;
    console.log('New counter value: ', counter)
    res.cookie('visitCounter', counter, {maxAge: 2*60*60*1000})
    res.send('Cookie was set to ' + counter)
})

router.get('/chat', (req,res) =>{
    res.render('chat')
});

router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
    userModel.getUsers()
        .then(users => {
            authentication.authenticateUser(req.body, users, res);
        })
        .catch(err => res.sendStatus(500))
    });


router.get ('/logout', (req, res) =>{
    res.cookie('accessToken', '', {maxAge: 0});
    res.redirect('/')
});

router.route('/register')
    .get((req, res) => {
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
                res.redirect('/login')
            })
            .catch(err => next(err));
    });

module.exports = router;