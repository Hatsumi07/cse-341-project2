const express = require("express");
const cors = require("cors");
const bodyParser =  require("body-parser");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const port = process.env.PORT || 8083;

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]}))
  .use(cors({ origin: "*"}))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(session({
    secret: "secret" ,
    resave: false ,
    saveUninitialized: true ,
  }))
  //  This is the basic express session({..}) initialization
  .use(passport.initialize())
  //  init passport to use "express-session"
  .use(passport.session())
  //  allow passport to use "express-session"
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods", 
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  })
  .use("/", require("./routes"));

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
  //});
}
));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
app.get("/", (req, res) => {
  res.send(req.session.user != undefined ? `Logged in as ${req.session.user.username}` : "Logged Out");
});
app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs", session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  });

mongodb.initDb((err) =>{
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});