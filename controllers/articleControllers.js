const Connection = require("mysql2");
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

/*
 controller.post = (req, res) => {
   const form = formidable({
     multiples: true,
     uploadDir: process.cwd{} + "/public/img",
    keepExtensions: true,
   });

   form.parse(req, {err,fields,files}) => {
     console.log(fields);
    console.log(files);

     Connection.query{
       "INSERT INTO articles (title, content) VALUES (?,?)",
       [fields.title, fields.content],

       (err, results) => {
        !err ? res.redirect("/") : res.json(err);
       }
    };
   };
 }; 
 
 */
module.exports = { showAll, show, destroy };
