const userModel = require('../models/userModel.js');

function getUsers(req, res, next) {
    userModel.getUsers().then(users => res.render('users', {users})).catch(err => res.sendStatus(500));
}

function getUser(req, res, next) {
    userModel.getUser(req.params.id).then(user => res.render('user', {user})).catch(err => res.sendStatus(500))
}

function deleteUser(req, res, next) {
    console.log(req.body)
    // userModel.deleteUser(req.body).then();
}

module.exports = {
    getUser,
    getUsers,
    deleteUser
}