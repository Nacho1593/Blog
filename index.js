require("dotenv").config();
const express = require("express");
const flash = require("express-flash");
const app = express();
const routes = require("./routes");
const compare = require("./middlewares/bcrypt");
require("./passport-setup");

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require("express-session");
const passport = require("passport");
const cookieSession = require("cookie-session");
const LocalStrategy = require("passport-local").Strategy;
const { Author } = require("./database/Sequelize");

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

app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// Example protected and unprotected routes
app.get("/", (req, res) => res.render("pages/index"));
app.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get("/good", isLoggedIn, (req, res) => {
  res.render("pages/profile", {
    name: req.user.displayName,
    pic: req.user.photos[0].value,
    email: req.user.emails[0].value,
  });
});

// Auth Routes
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

//NOTE, ROUTES MUST BE IN THE END JUST BEFORE THE PORT-LISTEN IN ORDER TO MAKE PASSPORT WORK PROPERLLY
app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
