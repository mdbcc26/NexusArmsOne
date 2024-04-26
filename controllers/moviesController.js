const movieModel = require('../models/movieModel');

function getMovies(req, res, next) {
    movieModel.getMovies((err, movies) => {
        if (err) { res.sendStatus(500); }
        res.render('movies', {movies});
    });
}

module.exports = {
    getMovies
}