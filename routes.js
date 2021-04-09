const express = require("express");
const router = express.Router();
router.use(express.json());
const formidable = require("formidable");
const articleController = require("./controllers/articleControllers");
const mysql = require("mysql2");

//CONECTARSE A LA BASE DE DATOS
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Blog",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("¡Nos conectamos al Blog!");
});

//RUTA PARA HACER FUNCIONAR EN HOME
router.get("/", (req, res) => {
  connection.query(`SELECT * FROM articles`, (err, articles) => {
    if (err) throw err;
    res.render("home.ejs", { articles });
  });
});

//RUTA PARA HACER FUNCIONAR EN ADMIN
router.get("/admin", (req, res) => {
  connection.query(`SELECT * FROM articles`, (err, articles) => {
    if (err) throw err;
    res.render("admin.ejs", { articles });
  });
});

//RUTA PARA CREAR REGISTROS
router.get("/edit", (req, res) => {
  res.render("edit");
});

//RUTA PARA ARTICULOS
router.get("/articulos", (req, res) => {
  res.render("articulos");
});

//RUTA PARA QUE FUNCIONE EL EDITAR
const crud = require("./controllers/crud");
router.post("/save", crud.save);

router.get("/show/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    `SELECT * FROM articles WHERE id = "${id}" LIMIT 1`,
    (err, article) => {
      if (err) throw err;
      res.render("article.ejs", { article });
    }
  );
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
});

router.put("/admin/edit/:id", (req, res) => {
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
});

router.get("/admin/delete/:id", (req, res) => {
  connection.query(`DELETE FROM articles WHERE id = "${id}"`, (req, res) => {
    if (err) throw err;
    res.redirect("/");
  });
});

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

module.exports = router;
