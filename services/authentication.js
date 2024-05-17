const jwt = require('jsonwebtoken');

function authenticateUser({username, password}, users, res) {
    const user = users.find(user => {
        return user.hero === username && user.password === password;
    });

    if (user) {
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