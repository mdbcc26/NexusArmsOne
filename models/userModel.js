const {connection} = require("../services/database");

function getUsers() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users';
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        connection.query(sql, [id], function (err, results) {
            if (err) reject(err);
            resolve(results[0]);
        });
    });
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        connection.query(sql, [id], function (err, results) {
            if (err) reject(err);
            resolve();
        })
    })
}

module.exports = {
    getUsers,
    getUser,
    deleteUser
}