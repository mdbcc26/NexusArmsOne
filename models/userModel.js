
/*const users = [
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
];*/

const db = require('../services/database.js').config;

function getUsers(cb) {
    db.query('SELECT * FROM users', function (err, users, fields) {
        if (err) { cb(err) } //this is just for error handling
        console.log(users);
        cb(null, users)
    });
}

/*function getUsers() {
    return users;
}*/

function getUser(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, [id], function (err, results) {
            if (err) {
                console.error("Failed to retrieve user:", err);
                reject(err);  // Reject the promise with the error
            } else if (results.length > 0) {
                console.log("User fetched successfully.");
                resolve(results[0]);  // Resolve with the first (and should be only) result
            } else {
                console.log("User not found.");
                resolve(null);  // Resolve with null if no user is found
            }
        });
    });
}


let updateUser = (userData) => new Promise((resolve, reject)=>{
    let sql = "UPDATE users SET " +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", hero = " + db.escape(userData.hero) +
        ", email = " + db.escape(userData.email) +
        ", info = " + db.escape(userData.info) +
        "WHERE id = " + parseInt(userData.id);
    console.log(sql);
    db.query(sql, function (err, result, fields){
        if(err) {
            reject(err)
        }
        console.log(result.affectedRows + " rows have been affected")
        resolve(userData)
    })
})

module.exports = {
    getUsers,
    getUser,
    updateUser
}