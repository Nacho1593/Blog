const Connection = require("mysql2");
const { Article, Comment, Author } = require("../database/Sequelize");

const showHome = async (req, res) => {
  Article.findAll({
    limit: 12,
    order: [["createdAt", "DESC"]],
  }).then((articles) => {
    res.render("home.ejs", { articles });
  });
};

const showAdmin = async (req, res) => {
  Article.findAll({
    limit: 12,
    order: [["createdAt", "DESC"]],
  }).then((articles) => {
    res.render("admin.ejs", { articles });
  });
};

///         /CONNECT A FIND ID SYSTEM
/* User.findByPk(123).then((user) => {
  console.log(user);
}); */

/* async function show(req, res) {
  const article = await Article.findById(req.params.id);
  res.render("articulos.ejs", { article });
} */

///        /CONNECT ARTICLE CREATION
/* User.create({
  firstname: "María",
  lastname: "Pérez",
  email: "mariaperez@gmail.com",
}).then((user) => {
  console.log(user);
}); */

///        /CONNECT ARTICLE DESTRUCTION
/* User.destroy({
  where: {
    firstname: "Pablo",
  },
}).then(() => {
  console.log("¡Usuarios eliminados!");
}); */

///        /CONNECT ARTICLE UPDATE
/* User.update(
  { lastname: "Pérez" },
  {
    where: {
      lastname: "Gómez",
    },
  }
).then(() => {
  console.log("¡Usuarios actualizados!");
}); */

module.exports = { showHome, showAdmin };
