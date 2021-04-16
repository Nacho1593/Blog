const express = require("express");
const flash = require("express-flash");
const app = express();
const routes = require("./routes");
const bcrypt = require("bcrypt");
const compare = require("./middlewares/bcrypt");

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require("express-session");
const passport = require("passport");
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

//NOTE, ROUTES MUST BE IN THE END JUST BEFORE THE PORT-LISTEN IN ORDER TO MAKE PASSPORT WORK PROPERLLY
app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
