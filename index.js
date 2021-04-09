const express = require("express");
const app = express();
const routes = require("./routes");
const formidable = require("formidable");
const { urlencoded } = require("express");

const port = 3305;

app.set("view engine", "ejs");
app.use(express.static("public/")); //permite usar mi css
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(port, (req, res) => console.log("Server has starter ..."));
