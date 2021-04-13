//CRUD
const connection = require("../database/createTables");

exports.save = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const image = req.body.image;
  const date = req.body.date;
  const author = req.body.author;
  console.log(
    title + " - " + content + " - " + image + " - " + date + " - " + author
  );
};
