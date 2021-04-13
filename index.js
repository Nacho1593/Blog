const express = require("express");
const app = express();
const routes = require("./routes");
const { urlencoded } = require("express");
const port = 3305;
const { Sequelize, Model, DataTypes } = require("sequelize");
const ArticleModel = require("./models/Article");
const AuthorModel = require("./models/Author");
const CommentModel = require("./models/Comment");
const sequelize = new Sequelize("blog", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

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
app.set("view engine", "ejs");
app.use(express.static("public/")); //permite usar mi css
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(port, (req, res) => console.log("Server has starter ..."));
