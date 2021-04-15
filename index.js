const express = require("express");
const flash = require("express-flash");
const app = express();
const routes = require("./routes");

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Step 3
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Author } = require("./database/Sequelize");

app.use(flash());

//Step 4
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

//Step 5
app.use(passport.initialize());
app.use(passport.session());

//Step 6
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

//Step 7
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

//Step 10
/* app.post("/register", async (req, res) => {
  const [user, created] = await User.findOrCreate({
    // Ver opciones en Sequelize.
  });
  if (created) {
    req.login(user, () => res.redirect("/admin"));
  } else {
    res.redirect("back");
  }
}); */

//Step 11

app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
