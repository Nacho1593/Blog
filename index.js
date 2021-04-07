const express = require("express");
const app = express();
const routes = require("./routes");
const port = 3000;

app.set("view engine", "ejs");
app.listen(port, (req, res) => console.log("Server has starter ..."));
