require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");

const { urlencoded } = require("express");
const { route } = require("./routes");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public/")); //permite usar mi css
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
<<<<<<< Updated upstream
=======

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Author } = require("./database/Sequelize");
const FacebookStrategy = require("passport-facebook");

app.use(flash());

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await Author.findOne({ where: { email: username } });
      if (!user) {
        return done(null, false, {
          message: "Usuario incorrecto",
        });
      }
      if (user.password !== password) {
        return done(null, false, {
          message: "Contraseña incorrecta",
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  Author.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, user);
    });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: 289628189443236,
      clientSecret: "4e8e6d743c8c20cfdc75d6acf42a4258",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      Author.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/admin",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/admin");
  }
);
//NOTE, ROUTES MUST BE IN THE END JUST BEFORE THE PORT-LISTEN IN ORDER TO MAKE PASSPORT WORK PROPERLLY
>>>>>>> Stashed changes
app.use(routes);

app.listen(port, (req, res) => console.log("Server has starter ..."));
