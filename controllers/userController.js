
const userModel = require('../models/userModel.js');

function getUsers(req, res, next) {
    userModel.getUser(parseInt(req.params.id))
        .then((users) => {res.render('user', {users})})
        .catch((err) => {res.sendStatus(500); next(err);})
}

function getUser(req, res, next) {
    userModel.getUser(parseInt(req.params.id))
        .then((user) => {res.render('user', {user})})
        .catch((err) => {res.sendStatus(500)})
}

function editUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then(user => res.render('editUser', {user}))
        .catch(error => res.sendStatus(500))
}

function updateUser(req, res, next) {
    userModel.updateUser(req.body)
        .then(user => res.render('user', {user}))
        .catch(error => res.sendStatus(500))
}

module.exports = {
    getUser,
    getUsers,
    editUser,
    updateUser
}