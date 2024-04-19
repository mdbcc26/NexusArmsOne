<<<<<<< HEAD
const userModel = require("../models/userModel");


function getUsers(req, res, next) {
    let users = userModel.getUsers();
    //res.json(users);
    res.render('users', {users});
=======
const userModel = require('../models/userModel.js');

function getUsers(req, res, next) {
    let users = userModel.getUsers();
    res.render('users', {users})
>>>>>>> 333f70b40c65406d75ccf5b67fcf9d4442c38aad
}

function getUser(req, res, next) {
    let user = userModel.getUser(req.params.id);
<<<<<<< HEAD
    res.json(user);
}

module.exports = {
    getUsers,
    getUser
=======
    res.render('user', {user});
}

module.exports = {
    getUser,
    getUsers
>>>>>>> 333f70b40c65406d75ccf5b67fcf9d4442c38aad
}