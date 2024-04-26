const { sequelize } = require("../services/database");
const { Movie } = require("./movie.model.js");

function getMovies(cb) {
    sequelize.sync().then(() => {
        Movie.findAll().then((movies) => { cb(null, movies);}).catch((err) => { cb(err); });
    });
}

module.exports= {getMovies};