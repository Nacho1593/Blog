const Connection = require("./Connection");

class Article {
  static findAll() {
    Connection.query(`SELECT * FROM articles`);
  }

  static find(id) {
    Connection.query(`SELECT * FROM articles WHERE id = ${id} LIMIT 1`);
  }

  create() {
    connection.query(`INSERT INTO article(title, content, author) VALUES(
      ${connection.escape(article.title)},
      ${connection.escape(article.content)},
      ${connection.escape(article.author)},
    )`);
  }

  static update() {
    connection.query(
      `UPDATE articles SET title = ${connection.escape(article.title)},
    image = ${connection.escape(article.image)},
    content = ${connection.escape(article.content)}
    WHERE id = "${id}"`
    );
  }

  destroy(id) {
    connection.query(`DELETE FROM articles WHERE id = "${id}"`);
  }
}

module.exports = Article;
