require('dotenv').config()
const { Sequelize } = require("Sequelize");
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:"atp.fhstp.ac.at",
    port: 8007,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = {connection};