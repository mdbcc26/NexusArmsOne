const userModel = require('../models/userModel.js');
const authentication = require('../services/authentication.js');

//Get all users from the database
function getUsers(req, res) {
    userModel.getUsers()
        .then(users => {
            res.render('users', { users });
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
        });
}

//Get a single user from the database and render the user view
function getUser(req, res) {
    userModel.getUser(parseInt(req.params.id))
        .then(user => {
            if (user) {
                res.render('user', { user });
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            console.error('Error fetching user:', err);
            res.status(500).send('Error fetching user');
        });
}

//Add a new user to the database and redirect to the login page
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

//Render the edit user view
function editUser(req,res) {
    userModel.getUser(req.params.id)
        .then(user => res.render('editUser', {user}))
        .catch(err => res.sendStatus(500))
}

//Update the user in the database and render the user view
function updateUser(req,res) {
    userModel.updateUser(req.body)
        .then(user => res.render('user', {user}))
        .catch(err => res.sendStatus(500))
}

//Delete the user from the database and redirect to the home page
function deleteUser(req,res) {
    userModel.deleteUser(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => res.sendStatus(500));
}

function authenticateUser(req, res) {
    userModel.getUsers()
        .then(users => {
            authentication.authenticateUser(req.body, users, res);
        })
        .catch(err => res.sendStatus(500));
}

module.exports = {
    getUser,
    getUsers,
    addUser,
    editUser,
    updateUser,
    deleteUser,
    authenticateUser,
}