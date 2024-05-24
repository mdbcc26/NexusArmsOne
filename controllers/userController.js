const userModel = require('../models/userModel.js');

/* uses callbacks
function getUsers(req, res, next) {
    let users = userModel.getUsers(function (err, users) {
        if (err) res.sendStatus(500);
        res.render('users', {users})
    });
}

function getUser(req, res, next) {
    userModel.getUser(req.params.id, function (err, user) {
        if (err) res.sendStatus(500);
        res.render('user', {user})
    });
}
*/

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
        .then(user => res.render('users', {user}))
        .catch(err => res.sendStatus(500))
}

module.exports = {
    getUser,
    getUsers,
    editUser,
    updateUser
}