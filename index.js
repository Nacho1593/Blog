const express = require("express");
const app = express();
const routes = require("./routes");

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
