const userModel = require("../models/userModel");

function getUsers(req,res,next) {
    let users = userModel.getUsers();
    res.render('users', {users});
}

function getUser(req, res, next) {
    let user = userModel.getUser(req.params.id);
    res.render('user', {user});
}

module.exports = {
    getUser,
    getUsers
}