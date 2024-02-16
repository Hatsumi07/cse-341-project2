const { body, validationResult } = require("express-validator");

const movieValidator = [
    body("movieName", "Movie is required")
    .exists(),
    body("director", "director is required")
    .exists(),
    body("year", "year is required")
    .exists(),
    body("country", "country is required")
    .exists()
  ]

  const actorValidator = [
    body("firstName", "first name is required")
    .exists(),
    body("firstName", "Must be a string")
    .isString(),
    body("lastName", "last name is required")
    .exists(),
    body("lastName", "Must be a string")
    .isString(),
    body("age", "Age is required")
    .exists(),
    body("age", "Age should be a number")
    .isNumeric(),
    body("birthday", "Birthday must be a string")
    .optional()
    .isString()
  ]

module.exports = {
    movieValidator,
    actorValidator
}