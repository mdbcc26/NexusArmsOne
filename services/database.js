require('dotenv').config();
const mysql = require('mysql2');
const { Sequelize } = require("Sequelize");

const config = mysql.createConnection({
    host: "atp.fhstp.ac.at",
    port: 8007,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "cc231022",
});

config.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!")
});

const sequelize = new Sequelize(
    "cc231022",
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: "atp.fhstp.ac.at",
        port: 8007,
        dialect: "mysql"
    });
module.exports = {config, sequelize};