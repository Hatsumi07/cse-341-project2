const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const createError = require("http-errors");

const getAll = async (req, res) => {
    // #swagger.tags=["Movies"]
    const result = await mongodb.getDatabase().db().collection("movies").find();
    result.toArray().then((movies) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(movies);
    });
}

const getSingle = async (req, res) => {
    // #swagger.tags=["Movies"]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid movie id to find a movie.');
            throw createError(404, "Invalid ID format");
        }
        const movieId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('movies')
            .find({ _id: movieId })
            .toArray((result) => {
            return result;
            });
            if (!response.length > 0) {
                res.status(500).json(response.error || "Contact doesn't exist");
                throw createError(404, "Movie does not exist"); 
            }
            // res.setHeader("Content-Type", "application/json");
            res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }

};

const createMovie = async(req, res) => {
    // #swagger.tags=["Movies"]
    const movie = {
        movieName: req.body.movieName,
        director: req.body.director,
        year: req.body.year,
        country: req.body.country
    };
    const response = await mongodb.getDatabase().db().collection("movies").insertOne(movie);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while creating movie.");
    }
};

const updateMovie =  async(req, res) => {
    // #swagger.tags=["Movies"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to find a movie.');
        throw createError(404, "Invalid ID format");
    }
    const movieId = new ObjectId(req.params.id);
    const movie = {
        movieName: req.body.movieName,
        director: req.body.director,
        year: req.body.year,
        country: req.body.country
    };
    const response = await mongodb
    .getDatabase()
    .db()
    .collection("movies")
    .replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating movie.");
    }
};

const deleteMovie = async(req, res) => {
    // #swagger.tags=["Movies"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to find a movie.');
        throw createError(404, "Invalid ID format");
    }
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("movies").deleteOne({ _id: movieId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while deleting movie.");
    }    
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
}