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

let updateUser = (userData) => new Promise(async (resolve, reject) => {
    try {
        // Update or create loadout first
        const loadoutID = await upsertLoadout(userData);

        // Update the user details
        let sql = "UPDATE Users SET " +
            "Username = " + db.escape(userData.username) + ", " +
            "RoleID = " + db.escape(userData.role) + ", " +
            "LoadoutID = " + db.escape(loadoutID);

        // Update password only if provided
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
            sql += ", Password = " + db.escape(userData.password);
        }

        sql += " WHERE UserID = " + db.escape(userData.id);

        db.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    } catch (err) {
        reject(err);
    }
});

let upsertLoadout = (userData) => new Promise((resolve, reject) => {
    // Check if the loadout exists for the user
    let sqlCheck = "SELECT LoadoutID FROM Users WHERE UserID = " + db.escape(userData.id);

    db.query(sqlCheck, (err, result) => {
        if (err) return reject(err);

        let loadoutID = result[0] ? result[0].LoadoutID : null;
        let sql;

        if (loadoutID) {
            // Update existing loadout
            sql = `
                UPDATE UserLoadout 
                SET 
                    Weapon1ID = ${db.escape(userData.weapon1)},
                    Weapon2ID = ${db.escape(userData.weapon2)},
                    ArmorID = ${db.escape(userData.armor)}
                WHERE LoadoutID = ${db.escape(loadoutID)}
            `;
        } else {
            // Insert new loadout
            sql = `
                INSERT INTO UserLoadout (Weapon1ID, Weapon2ID, ArmorID) 
                VALUES (
                    ${db.escape(userData.weapon1)},
                    ${db.escape(userData.weapon2)},
                    ${db.escape(userData.armor)}
                )
            `;
        }

        db.query(sql, (err, result) => {
            if (err) return reject(err);

            if (!loadoutID) {
                // If we inserted a new loadout, get the new LoadoutID
                loadoutID = result.insertId;
            }

            resolve(loadoutID);
        });
    });
});

let getRoles = () => new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Roles`;
    db.query(sql, (err, roles) => {
        if (err) {
            reject(err);
        } else {
            resolve(roles);
        }
    });
});

let getWeapons = () => new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Weapons`;
    db.query(sql, (err, weapons) => {
        if (err) {
            reject(err);
        } else {
            resolve(weapons);
        }
    });
});

let getArmors = () => new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Armor`;
    db.query(sql, (err, armors) => {
        if (err) {
            reject(err);
        } else {
            resolve(armors);
        }
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

module.exports = {
    getUsers,
    getUser,
    updateUser,
    getRoles,
    getWeapons,
    getArmors,
    addUser,
    deleteUser,
}