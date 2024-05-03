/* const users = [
    {
        id: 1,
        name: 'Tony Stark',
        hero: 'Ironman',
        email: 'ironman@vangers.com',
        info: 'I am Ironman!'
    },

    {
        id: 2,
        name: 'Bruce Wane',
        hero: 'Batman',
        email: 'batman@batcave.com',
        info: 'I am Batman'
    },

    {
        id: 3,
        name: 'Peter Parker',
        hero: 'Spiderman',
        email: 'spider@man.com',
        info: 'The human spider!'
    },

    {
        id: 4,
        name: 'Paul Atredies',
        hero: 'Lisan Al-Gaib',
        email: 'emperor@oftheknownuniverse.tm',
        info: 'May your blade chip and shatter'
    },

    {
        id: 5,
        name: 'Stilgar',
        hero: 'Fedykin',
        email: 'sietch@tabr.fm',
        info: 'As written.'
    },

    {
        id: 6,
        name: 'Vladimir Harkonnen',
        hero: 'The Baron',
        email: 'baron@harkonnen.gp',
        info: 'My desert. My Arrakis. My Dune.'
    },
];

 */

const db  = require('../services/database.js').config;

function getUsers(cb) {
    db.query('SELECT * FROM users', function (err, users, fields) {
        if (err) cb(err);
        console.log(users);
        cb(null, users);
    });
}

function getUser(id) {
    let user = users.find(element => element.id === parseInt(id));
    if(typeof user !== 'undefined') {
        return user;
    }
    else {
        return 'Error 404: User not found.';
    }
}

let updateUser = (user) => new Promise((resolve, reject) => {
    let sql = "UPDATE users SET" +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", email = " + db.escape(userData.email) +
        ", hero = " + db.escape(userData.hero) +
        ", info = " + db.escape(userData.info) +
        " WHERE id = " + parseInt(userData.id);

    console.log(sql);

    db.query(sql, function (err, result, fields) {
        if (err) {
            reject(err);
        }
        console.log(result.affectedRows + " rows affected")
        resolve(userData);
    })
})

module.exports = {
    getUsers,
    getUser,
    updateUser
}