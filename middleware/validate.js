const { body, validationResult } = require("express-validator");

const isDataValidated = async (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        // data: err,
        errors: errors.array()
      });
      console.log(errors)
    } else {
      next();
    }
}

module.exports = {
  isDataValidated
};