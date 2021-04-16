const express = require("express");
const router = express.Router();
router.use(express.json());

const { showHome, showAdmin } = require("./controllers/articleControllers");
router.use(express.urlencoded({ extended: true }));

router.get("/", showHome);

const bcrypt = require("bcryptjs");
router.get("/admin", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("Hola//", salt, function (err, hash) {
      // Store hash in your password DB.

      bcrypt.compare("Hola//", hash, function (err, result) {
        console.log(result);
        if (err) {
          console.log("Error de algo"); // QUE ES?
        }
        if (result) {
          showAdmin(req, res);
        } else {
          console.log("mala contraseña");
        }
      });
    });
  });
});

// passport
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  })
);
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      try {
        const user = await Author.findOne({ where: { email: username } });
        if (!user) {
          return done(null, false, {
            message: "Usuario  incorrectos",
          });
        }

        if (user.password !== password) {
          return donde(null, false, {
            message: "Contraseña incorrecta",
          });
        }
        // if (!bcrypt.compareSync(password, user.password)) {
        //   return done(null, false, {
        //     message: "contraseña incorrectos",
        //   });
        // }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, user);
    });
});

router.get("/registro", (req, res) => res.end("Hola"));
router.post("/registro", (req, res) => res.end("Hola"));

router.get("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/users/" + user.username);
    });
  })(req, res, next);
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => res.end("Hola"));

module.exports = router;
