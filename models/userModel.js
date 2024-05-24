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
const bcrypt = require('bcrypt');

let getUsers = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', function (err, users, fields) {
        if (err) {
            reject(err);
        }
        else {
            console.log(users);
            resolve(users);
        }
    });
});

let getUser = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = ` + parseInt(id), function (err, user, fields) {
        if (err) {
            reject(err);
        }
        else {
            console.log(user);
            resolve(user[0]);
        }
    });
});

let updateUser = (user) => new Promise(async (resolve, reject) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = "UPDATE users SET" +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", email = " + db.escape(userData.email) +
        ", hero = " + db.escape(userData.hero) +
        ", info = " + db.escape(userData.info) +
        ", password = " + db.escape(userData.password) +
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

let addUser = (userData) => new Promise( async (resolve, reject) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = `INSERT INTO ${usersTable} (name, surname, hero, email, info, password)
VALUES (` +
        db.escape(userData.name) + ", " +
        db.escape(userData.surname) + ", " +
        db.escape(userData.hero) + ", " +
        db.escape(userData.email) + ", " +
        db.escape(userData.info) + ", " +
        db.escape(userData.password) + ")";
    console.log(sql);
    dp - query(sql, function (err, result, fields) {
        if (err) {
            reject(err);
        }
        console.log(result.affectedRows + "rows have been affected.")
        resolve(userData)
    })
});


module.exports = {
    getUsers,
    getUser,
    updateUser
}