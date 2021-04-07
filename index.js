const express = require("express");
const app = express();
const routes = require("./routes");
const mysql = require("mysql2");
const port = 3000;

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

app.set("view engine", "ejs");
app.listen(port, (req, res) => console.log("Server has starter ..."));
