const db = require('../services/database.js').config;
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

let getUser = (id) => new Promise(async (resolve, reject) => {
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

let updateUser = (userData) => new Promise (async (resolve,reject) => {
    //userData.password = await bcrypt.hash(userData.password, 10);
    let sql = "UPDATE users SET" +
    "name = " + db.escape(userData.name) +
    ", surname = " + db.escape(userData.surname) +
    ", email = " + db.escape(userData.email) +
    ", hero = " + db.escape(userData.hero) +
    ", info = " + db.escape(userData.info) +
    " WHERE id = " +parseInt(userData.id);

    console.log(sql);

    db.query(sql, function (err, result, fields) {
        if (err) {
            reject(err);
        }
        console.log(result.affectedRows + "rows have been affected.")
        resolve(userData)
    })
})

let addUser = (userData) => new Promise( async (resolve, reject) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = `INSERT INTO users (name, surname, hero, email, info, password)
VALUES (` +
        db.escape(userData.name) + ", " +
        db.escape(userData.surname) + ", " +
        db.escape(userData.hero) + ", " +
        db.escape(userData.email) + ", " +
        db.escape(userData.info) + ", " +
        db.escape(userData.password) + ")";
    console.log(sql);
    db.query(sql, function (err, result, fields) {
        if (err) {
            reject(err);
        }
        console.log(result.affectedRows + "rows have been affected.")
        resolve(userData)
    })
});

let deleteUser = (id) => new Promise((resolve, reject) => {
    let sql = `DELETE FROM users WHERE id = ${db.escape(id)}`;

    db.query(sql, (err, result) => {
        if (err) {
            return reject(err);
        }
        console.log(result.affectedRows + " rows have been deleted.");
        resolve(result)
    });
});

module.exports = {
    getUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser
}