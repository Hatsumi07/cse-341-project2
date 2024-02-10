const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.use("/actors", require("./actors"));

router.use("/movies", require("./movies"));

module.exports = router;