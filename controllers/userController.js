const userModel = require('../models/userModel.js');

function getUsers(req, res, next) {
    let users = userModel.getUsers();
    res.render('users', {users})
}

function getUser(req, res, next) {
    let user = userModel.getUser(req.params.id);
    res.json(user);
}

module.exports = {
    getUser,
    getUsers
}