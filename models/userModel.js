const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');

let getUsers = () => new Promise((resolve, reject) => {
    const sql = `
        SELECT 
            u.UserID, u.Username, u.Password, r.Role, 
            w1.Weapon AS Weapon1, w2.Weapon AS Weapon2, a.Armor
        FROM Users u
        LEFT JOIN Roles r ON u.RoleID = r.RoleID
        LEFT JOIN UserLoadout l ON u.LoadoutID = l.LoadoutID
        LEFT JOIN Weapons w1 ON l.Weapon1ID = w1.WeaponID
        LEFT JOIN Weapons w2 ON l.Weapon2ID = w2.WeaponID
        LEFT JOIN Armor a ON l.ArmorID = a.ArmorID;
    `;

    db.query(sql, function (err, users) {
        if (err) {
            reject(err);
        } else {
            resolve(users);
        }
    });
});
/*let getUsers = () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM Users', function (err, users) {  //Old Table Name: usersSSC
        if (err) {
            reject(err);
        }
        else {
            console.log(users);
            resolve(users);
        }
    });
});*/

let getUser = (id) => new Promise(async (resolve, reject) => {
    const sql = `
        SELECT 
            u.UserID, u.Username, r.Role, 
            w1.Weapon AS Weapon1, w2.Weapon AS Weapon2, a.Armor
        FROM Users u
        LEFT JOIN Roles r ON u.RoleID = r.RoleID
        LEFT JOIN UserLoadout l ON u.LoadoutID = l.LoadoutID
        LEFT JOIN Weapons w1 ON l.Weapon1ID = w1.WeaponID
        LEFT JOIN Weapons w2 ON l.Weapon2ID = w2.WeaponID
        LEFT JOIN Armor a ON l.ArmorID = a.ArmorID
        WHERE u.UserID = ?;
    `;

    db.query(sql, [id], function (err, result) {
        if (err) {
            reject(err);
        } else {
            if (result.length > 0) {
                resolve(result[0]);
            } else {
                resolve(null);
            }
        }
    });
});
/*let getUser = (id) => new Promise(async (resolve, reject) => {
    db.query(`SELECT * FROM Users WHERE id = ` + parseInt(id), function (err, user) {  //Old Table Name: usersSSC
        if (err) {
            reject(err);
        }
        else {
            console.log(user);
            resolve(user[0]);
        }
    });
});*/

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
    console.log("Deleting user with ID: " + id);
    let sql = `DELETE FROM Users WHERE UserID = ${db.escape(id)}`;
    console.log(sql);
    db.query(sql, (err, result) => {
        if (err) {
            return reject(err);
        }
        console.log(result.affectedRows + " rows have been deleted.");
        resolve(result)
    });
});

let assignRole = (userId, roleId) => new Promise((resolve, reject) => {
    let sql = `UPDATE Users SET RoleID = ${db.escape(roleId)} WHERE UserID = ${db.escape(userId)}`;

    db.query(sql, (err, result) => {
        if (err) {
            reject(err);
        } else {
            console.log(result.affectedRows + " row(s) updated with new role.");
            resolve(result);
        }
    });
});

module.exports = {
    getUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser,
    assignRole
}