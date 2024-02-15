const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));

// router.get("/", (req, res) => {
//     res.send("Hello World");
// });

router.use("/actors", require("./actors"));

router.use("/movies", require("./movies"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

module.exports = router;