const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

async function checkPassword(password, hash) {
    let pw = await bycrypt.compare(password, hash);
    return pw;
}

function authenticateUser({email, password}, users, res) {
    const user = users.find(u => {
        return u.email === email;
    });

    if (user && checkPassword(password, user.password)) {
        const accessToken = jwt.sign ({id: user.id, name: user.name}, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', accessToken);
        res.redirect('/users/' + user.id);
    } else {
        res.send('Username/Password are incorrect or does not exist!')
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
            if (err) {
                return res.sendStatus(403);
            }
            console.log(user);
            req.user = user;
        })
    } else {res.sendStatus(401);}
}

module.exports = {authenticateUser, authenticateJWT}
