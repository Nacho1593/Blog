const { Article, Comment, Author } = require("../database/Sequelize");

const showHome = async (req, res) => {
  Article.findAllArticles.then((articles) => {
    res.render("home.ejs", { articles });
  });
};

const showAdmin = async (req, res) => {
  Article.findAllArticles.then((articles) => {
    res.render("admin.ejs", { articles });
  });
};

const showArticle = async (req, res) =>
  Article.findByPk(req.params.id).then((article) => {
    res.render("article.ejs", { article });
  });

module.exports = { showHome, showAdmin, showArticle };
