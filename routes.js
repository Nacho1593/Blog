const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  showHome,
  showAdmin,
  showArticle,
} = require("./controllers/articleController");
const { showLogin } = require("./controllers/authController");
const loginControl = require("./middlewares/loginControl");
const passport = require("passport");

//LOGIN
router.get("/login", showLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

//GET ARTICLES
router.get("/", showHome);
router.get("/article/:id", showArticle);

//GET ADMIN FUNCTIONS
router.get("/admin", loginControl, showAdmin);

module.exports = router;
