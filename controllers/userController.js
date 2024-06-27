const userModel = require('../models/userModel.js');
const authentication = require('../services/authentication.js');

function getUsers(req, res, next) {
    userModel.getUsers()
        .then((users) => {res.render('users', {users})})
        .catch((err) => {res.sendStatus(500)})
}

function getUser(req, res, next) {
    userModel.getUser(parseInt(req.params.id))
        .then((user) => {res.render('user', {user})})
        .catch((err) => {res.status(500); next(err)})
}


function addUser(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        console.error('Username and password are required')
        return res.status(400).json({ error: 'Username and password are required' });
    }

    userModel.addUser({ username, password })
        .then(result => {
            res.redirect('/login')
        })
        .catch(err => next(err));
}

function editUser(req,res,next) {
    userModel.getUser(req.params.id)
        .then(user => res.render('editUser', {user}))
        .catch(err => res.sendStatus(500))
}

function updateUser(req,res,next) {
    userModel.updateUser(req.body)
        .then(user => res.render('user', {user}))
        .catch(err => res.sendStatus(500))
}

function deleteUser(req,res,next) {
    userModel.deleteUser(req.params.id)
        .then(() => {
            res.cookie('confirmationMessage', 'User has been deleted successfully.', { maxAge: 5000 });
            res.redirect('/');
        })
        .catch(err => res.sendStatus(500));
}

function authenticateUser(req, res) {
    userModel.getUsers()
        .then(users => {
            authentication.authenticateUser(req.body, users, res);
        })
        .catch(err => res.sendStatus(500))
}


module.exports = {
    getUser,
    getUsers,
    addUser,
    editUser,
    updateUser,
    deleteUser,
    authenticateUser
}