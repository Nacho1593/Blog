const express = require("express");
const router = express.Router();
router.use(express.json());

const { showHome, showAdmin } = require("./controllers/articleControllers");
router.use(express.urlencoded({ extended: true }));

//           /GET ALL

router.get("/", showHome);

//           /GET ONE
/* router.get("/articulos", (req, res) => {
  res.render("articulo.ejs");
}); */

//           /ADMIN

router.get("/admin", showAdmin);

/* router.put("/admin/edit/:id", (req, res) => {
  const article = req.body;
  const id = req.params.id;
  connection.query(
    `UPDATE articles SET title = ${connection.escape(article.title)},
  image = ${connection.escape(article.image)},
  content = ${connection.escape(article.content)}
  WHERE id = "${id}"`,
    (err, result) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
}); */

//           /DELETE

/* router.get("/delete", articleControllers.destroy);
router.get("/admin/delete/:id", (req, res) => {
  connection.query(`DELETE FROM articles WHERE id = "${id}"`, (req, res) => {
    if (err) throw err;
    console.log("hola");
    res.redirect("/");
  });
}); */

//           /UPDATE

/* router.get("/edit", (req, res) => {
  res.render("edit");
});
router.get("/admin/edit/:id", (req, res) => {
  const id = req.params.id;
  const article = req.body;
  connection.query(
    `SELECT * FROM articles WHERE id = "${id}" LIMIT 1`,
    (err, article) => {
      if (err) throw err;
      res.render("edit.ejs", { article });
    }
  );
}); */

//                 /POST
/* const create = require("./controllers/createController");
router.post("/save", create.save);

router.post("/admin/create", (req, res) => {
  const article = req.body;
  connection.query(
    `INSERT INTO article(title, content, author) VALUES(
    ${connection.escape(article.title)},
    ${connection.escape(article.content)},
    ${connection.escape(article.author)}
  )`,
    (req, res) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});
router.get("/create", (req, res) => {
  res.render("create");
}); */

//CONECTARSE A LA BASE DE DATOS

//RUTA PARA HACER FUNCIONAR EN HOME

//RUTA PARA HACER FUNCIONAR EN ADMIN

//RUTA PARA CREAR REGISTROS

//RUTA PARA CREAR REGISTROS

//RUTA PARA ARTICULOS

//RUTA PARA QUE FUNCIONE EL EDITAR

module.exports = router;
