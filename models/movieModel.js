const {sequelize } = require("../services/database");
const {Movie} = require("../models/movie.model");

function getMovies(cb) {
    sequelize.sync().then(() => {
        Movie.findAll().then((movies) => {cb(null, movies);}).catch((err) => {cb(err, null);});
    });
}

module.exports = {
    getMovies
}