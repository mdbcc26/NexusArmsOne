const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


async function checkPassword(password, hash){
    let pw = await bcrypt.compare(password, hash)
    return pw;
}

async function authenticateUser({username, password}, users, res){
    const user = users.find(u =>{
    return u.email === username
    });
    if(user && await checkPassword(password, user.password)){
        const accessToken = jwt.sign({id: user.id, name: user.name}, ACCESS_TOKEN_SECRET);

        res.cookie('accessToken', accessToken);
        res.redirect('user/'+user.id);
    }else {
        res.send('Username or password incorrect');
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    authenticateUser,
    authenticateJWT
}