const express = require("express");
const router = express.Router();
router.use(express.json());
const connection = require("./index");

router.get("/", (req, res) => {
  res.render("./home.ejs");
});

router.get("/", (req, res) => {
  res.render("home", { articulos });
});

router.get("/api/articles", (req, res) => {
  connection.query(`SELECT * FROM articles`, (err, articles) => {
    if (err) throw err;
    res.json(articles);
  });
});

router.get("/", (req, res) => {
  connection.query(`SELECT * FROM articles`, (err, articles) => {
    if (err) throw err;
    res.render("home.ejs", { articles });
  });
});

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
