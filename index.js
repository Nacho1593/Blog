const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const mysql = require("mysql2");
const port = 3305;

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

connection.query("SELECT * FROM articulos", function (err, articulos) {
  console.log(articulos);
});

app.set("view engine", "ejs");
app.use(express.static("public/")); //permite usar mi css

app.use(routes);

app.listen(port, (req, res) => console.log("Server has starter ..."));
