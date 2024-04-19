
const userModel = require('../models/userModel.js');

function getUsers(req, res, next) {
    let users = userModel.getUsers(function (err, users) {
        if (err) res.sendStatus(500);
        res.render('users', {users})
    });
}

function getUser(req, res, next) {
    let user = userModel.getUser(req.params.id);
    res.render('user', {user})
}


module.exports = {
    getUser,
    getUsers
}