const jwt = require('jsonwebtoken');
const user = require("ejs");

const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;

function authenticateUser({username,password},user,res){
    const user = users.find(u => {
        return u.email === username && u.password === password;
    });

    if (user){
        const accessToken = jwt.sign({id:user.id,name : user.name}, ACCESS_TOKEN_SECRET);

        res.cookie('accessToken', accessToken);
        res.redirect('/users/'+ user.id);
    } else {
        res.send('Username or password is incorrect');
    }
}




module.exports={
    authenticateUser,
}