const express = require("express");
const router = express.Router();

const moviesController = require("../controller/movies");
const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");

router.get("/", moviesController.getAll);

router.get("/:id", moviesController.getSingle);

router.post("/", schemas.movieValidator, middleware.isDataValidated, moviesController.createMovie);

router.put("/:id", moviesController.updateMovie);

router.delete("/:id", moviesController.deleteMovie);

module.exports = router;