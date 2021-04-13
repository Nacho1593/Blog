const { Sequelize, Model, DataTypes } = require("sequelize");
const ArticleModel = require("./Article");
const AuthorModel = require("./Author");
const CommentModel = require("./Comment");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
  }
);

const Article = ArticleModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

Article.belongsTo(Author, {
  as: "author",
});

Article.hasMany(Comment);

Author.hasMany(Article, {
  foreignKey: "authorId",
});

Author.hasMany(Comment, {
  foreignKey: "authorId",
});

Comment.belongsTo(Author, {
  as: "author",
});

Comment.belongsTo(Article);

Comment.belongsTo(Comment, {
  as: "parent",
});

Comment.hasMany(Comment, {
  foreignKey: "parentId",
  as: "response",
});

module.exports = {
  sequelize,
  Sequelize,
  Article,
  Comment,
};
