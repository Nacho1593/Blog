const Article = require("../models/Article");

async function showAll(req, res) {
  const articles = await Article.findAll();
  res.render("home.ejs", { articles });
}

async function show(req, res) {
  const article = await Article.findById(req.params.id);
  res.render("articulos.ejs", { article });
}

function destroy(req, res) {
  res.redirect("/");
}
module.exports = { showAll, show, destroy };
