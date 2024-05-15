const userModel = require('../models/userModel.js');

function getUsers(req, res, next) {
    let users = userModel.getUsers(function (err, users) {
        if (err) res.sendStatus(500);
        res.render('users', {users})
    });
}

    async function getUser(req, res) {
        try {
            const user = await getUser(req.params.id);
            if (user) {
                res.send(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            res.status(500).send('Error retrieving user: ' + err.message);
        }
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