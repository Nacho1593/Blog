const db = require("../models/sequelize");
db.sequelize.sync({ force: true }).then(() => console.log("done"));
