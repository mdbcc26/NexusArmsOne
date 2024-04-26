const { sequelize } = require("../services/database.js");
const { Movie } = require("./movie.model");

function getMovies(cb) {
    sequelize.sync().then(() => {
        Movie.findAll().then((movies) => { cb(null, movies); }).catch((err) => { cb(err); });
    });
}

module.exports = {
    getMovies
}