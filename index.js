require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const { urlencoded } = require("express");
const port = 3305;
const db = require("./models/sequelize");

app.set("view engine", "ejs");
app.use(express.static("public/")); //permite usar mi css
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
db.sequelize.sync({ force: true }).then(() => console.log("done"));

app.listen(port, (req, res) => console.log("Server has starter ..."));
