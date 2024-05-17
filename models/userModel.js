const {connection} = require("../services/database");
const string_decoder = require("node:string_decoder");

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

let addUser = (userData) => new Promise(async (resolve, reject) => {
    // insert into all columns in the users datatable the data from the form in the view
    let sql = "INSERT INTO users (name_users, surname_users, rank, clearance, email, password, id_files) VALUES (" +
        db.escape(userData.name_users) + ", " +
        db.escape(userData.surname_users) + ", " +
        db.escape(userData.id_files) + ")";
    console.log(sql);
    db.query(sql, function (err, result, fields){
        if(err){
            reject(err)
        }
        resolve(userData);
    })
})

module.exports = {
    getUsers,
    getUser,
    deleteUser,
    addUser
}