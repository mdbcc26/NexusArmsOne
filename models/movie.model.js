const {DataTypes} = require("sequelize");
const sequelize = require("../services/database").sequelize;
const data = require("../data/movies.js");

sequelize.authenticate().then(() => {
    console.log("Connection via Sequelize successful!");
}).catch((err) => {
    console.error("Unable to connect to database: ", err);
});
const Movie = sequelize.define("movies", {
    adult: {type: DataTypes.BOOLEAN},
    backdrop_path: {type: DataTypes.STRING},
    id: {type: DataTypes.STRING, primaryKey: true},
    original_language: {type: DataTypes.STRING},
    overview: {type: DataTypes.TEXT,},
    original_title: {type: DataTypes.STRING},
    popularity: {type: DataTypes.FLOAT},
    title: {type: DataTypes.STRING,},
    poster_path: {type: DataTypes.STRING,},
    release_date: {type: DataTypes.DATEONLY},
    video: {type: DataTypes.BOOLEAN},
    vote_average: {type: DataTypes.FLOAT},
    vote_count: {type: DataTypes.INTEGER}
});
sequelize.sync({force: true}).then(() => {
    console.log(data);
    Movie.bulkCreate(data, {validate: true}).then((result) => {
        console.log("Data added successfully");
    });
    console.log('Movie table created successfully!');
}).catch((err) => {
    console.log("Unable to create table: ", err);
});
module.exports = {Movie}