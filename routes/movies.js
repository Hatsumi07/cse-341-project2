const express = require("express");
const router = express.Router();

const moviesController = require("../controller/movies");
const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", moviesController.getAll);

router.get("/:id", moviesController.getSingle);

router.post("/", isAuthenticated, schemas.movieValidator, middleware.isDataValidated, moviesController.createMovie);

router.put("/:id", isAuthenticated, moviesController.updateMovie);

router.delete("/:id", isAuthenticated, moviesController.deleteMovie);

module.exports = router;