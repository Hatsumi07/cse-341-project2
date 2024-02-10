const express = require("express");
const router = express.Router();

const actorsController = require("../controller/actors");
const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");
console.log("reached actors.js in routes");
console.log("actorsCotroller.getAll()", typeof actorsController.getAll);

router.get("/", actorsController.getAll);

router.get("/:id", actorsController.getSingle);

router.post("/", schemas.actorValidator, middleware.isDataValidated, actorsController.createActor);

router.put("/:id", actorsController.updateActor);

router.delete("/:id", actorsController.deleteUser);

module.exports = router;