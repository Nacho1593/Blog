const express = require("express");
const router = express.Router();
router.use(express.json());
const Article = require("../models/Article");

function showApi(req, res) {
  const article = Article.findAll();
  res.render("home", { article });
}

module.exports = { showApi };
