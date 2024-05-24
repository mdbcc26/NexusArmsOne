const userModel = require('../models/userModel.js');

function getUsers(req, res, next) {
    let users = userModel.getUsers(function (err, users){
        if (err) res.sendStatus(500);
        res.render('users', {users})
    });
}

function getUser(req, res, next) {
    userModel.getUser(parseInt(req.params.id))
        .then((user) => {res.render('user', {user})})
        .catch((err) => {res.sendStatus(500)})
}

function editUser(req, res, next) {
    userModel.getUsers(req.params.id)
        .then(user => res.render('editUser', {user}))
        .catch(err => res.sendStatus(500))
}

function updateUser(req, res, next) {
    userModel.updateUser(req.body)
        .then(user => res.render('user', {user}))
        .catch(err => res.sendStatus(500))
}

module.exports = {
    getUser,
    getUsers,
    editUser,
    updateUser
}