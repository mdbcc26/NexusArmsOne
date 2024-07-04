const userModel = require('../models/userModel.js');
const authentication = require('../services/authentication.js');

//Get all users from the database
function getUsers(req, res) {
    userModel.getUsers()
        .then(users => {
            res.render('users', { users });
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
        });
}

//Get a single user from the database and render the user view
function getUser(req, res) {
    userModel.getUser(parseInt(req.params.id))
        .then(user => {
            if (user) {
                res.render('user', { user });
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            console.error('Error fetching user:', err);
            res.status(500).send('Error fetching user');
        });
}

//Add a new user to the database and redirect to the login page
function addUser(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        console.error('Username and password are required')
        return res.status(400).json({ error: 'Username and password are required' });
    }

    userModel.addUser({ username, password })
        .then(result => {
            console.log('addUser result', result);
            res.redirect('/login')
        })
        .catch(err => next(err));
}

// Render the edit user view
async function editUser(req, res) {
    try {
        const user = await userModel.getUser(req.params.id);
        const roles = await userModel.getRoles(); // Get all roles
        const weapons = await userModel.getWeapons(); // Get all weapons
        const armors = await userModel.getArmors(); // Get all armors
        res.render('editUser', { user, roles, weapons, armors });
    } catch (err) {
        console.log('editUser error', err);
        res.sendStatus(500);
    }
}

// Update the user in the database and render the user view
async function updateUser(req, res) {
    try {
        const userData = {
            id: req.params.id,
            username: req.body.username,
            password: req.body.password || null,
            role: req.body.role,
            weapon1: req.body.weapon1,
            weapon2: req.body.weapon2,
            armor: req.body.armor,
        };
        await userModel.updateUser(userData);
        res.redirect(`/users/${userData.id}`);
        /*const updatedUser = await userModel.updateUser(userData);
        res.render('user', { user: updatedUser });*/
    } catch (err) {
        console.log('updateUser error', err);
        res.status(500).render('error', { error: err });
    }
}

//Delete the user from the database and redirect to the home page
function deleteUser(req,res) {
    console.log('deleteUser', req.params.id);
    userModel.deleteUser(req.params.id)
        .then(() => {
            console.log('User deleted successfully');
            res.json({ message: 'User deleted successfully' });
        })
        .catch(err => {
            console.log('Error deleting user:', err);
            res.sendStatus(500);
        });
}

//Authenticate the user and redirect to the home page
function authenticateUser(req, res) {
    userModel.getUsers()
        .then(users => {
            authentication.authenticateUser(req.body, users, res);
        })
        .catch(err => {
            console.error('authenticateUser error', err);
            res.sendStatus(500)
        });
}

module.exports = {
    getUser,
    getUsers,
    addUser,
    editUser,
    updateUser,
    deleteUser,
    authenticateUser,
}