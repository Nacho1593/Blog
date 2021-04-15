const { Sequelize, Model, DataTypes } = require("sequelize");
const ArticleModel = require("../models/Article");
const AuthorModel = require("../models/Authors");
const CommentModel = require("../models/Comment");

const sequelize = new Sequelize("blogSQ", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const Article = ArticleModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

Article.findAllArticles = Article.findAll({
  limit: 12,
  order: [["createdAt", "DESC"]],
});

Article.belongsTo(Author);
Author.hasMany(Article);

Comment.belongsTo(Article);
Article.hasMany(Comment);

module.exports = {
  sequelize,
  Sequelize,
  Article,
  Author,
  Comment,
};
