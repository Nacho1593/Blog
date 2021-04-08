const express = require("express");
const app = express();
const routes = require("./routes");

const port = 3305;

app.set("view engine", "ejs");
app.use(express.static("public/")); //permite usar mi css

app.use(routes);

app.listen(port, (req, res) => console.log("Server has starter ..."));
