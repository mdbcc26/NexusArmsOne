const userModel = require("../models/userModel");


function getUsers(req, res, next) {
    let users = userModel.getUsers();
    //res.json(users);
    res.render('users', {users});
}

function getUser(req, res, next) {
    let user = userModel.getUser(req.params.id);
    res.json(user);
}

module.exports = {
    getUsers,
    getUser
}
