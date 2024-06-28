const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');

let getUsers = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM Users', function (err, users) {  //Old Table Name: usersSSC
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
    db.query(`SELECT * FROM Users WHERE id = ` + parseInt(id), function (err, user) {  //Old Table Name: usersSSC
        if (err) {
            reject(err);
        }
        else {
            console.log(user);
            resolve(user[0]);
        }
    });
});

let updateUser = (userData) => new Promise(async (resolve, reject) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = "UPDATE Users SET " +
        "Username = " + db.escape(userData.username) + ", " +
        "Password = " + db.escape(userData.password) +
        " WHERE UserID = " + db.escape(userData.id);

    console.log(sql);

    db.query(sql, function (err, result) {
        if (err) {
            reject(err);
        }
        console.log(result.affectedRows + " rows have been affected.");
        resolve(userData);
    });
});

/*let updateUser = (userData) => new Promise (async (resolve,reject) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = "UPDATE usersSSC SET" +
    "name = " + db.escape(userData.name) +
    ", surname = " + db.escape(userData.surname) +
    ", email = " + db.escape(userData.email) +
    ", hero = " + db.escape(userData.hero) +
    ", info = " + db.escape(userData.info) +
    " WHERE id = " +parseInt(userData.id);

    console.log(sql);

    db.query(sql, function (err, result) {
        if (err) {
            reject(err);
        }
        console.log(result.affectedRows + "rows have been affected.")
        resolve(userData)
    })
})*/

let addUser = (userData) => new Promise(async (resolve, reject) => {
    try {
        // Hash the password before storing it
        userData.password = await bcrypt.hash(userData.password, 10);

        // Construct the SQL query
        let sql = `INSERT INTO Users (Username, Password, Admin) VALUES (` +
            db.escape(userData.username) + ", " +
            db.escape(userData.password) + ", " +
            `false)`;

        // Execute the SQL query
        db.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log(result.affectedRows + " rows have been affected.");
                resolve(userData);
            }
        });
    } catch (error) {
        reject(error);
    }
});

let deleteUser = (id) => new Promise((resolve, reject) => {
    let sql = `DELETE FROM Users WHERE id = ${db.escape(id)}`;

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