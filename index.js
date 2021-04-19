require("dotenv").config();
const express = require("express");
const flash = require("express-flash");
const app = express();
const routes = require("./routes");
const compare = require("./middlewares/bcrypt");

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      Author.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

app.get(
  "/auth/google/admin",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/admin");
  }
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

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get("/good", isLoggedIn, (req, res) => {
  res.render("views/admin", {
    name: req.user.displayName,
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
