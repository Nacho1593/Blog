const customQuery = require("../database/customQuery");

class Article {
  id;
  title;
  content;
  author_id;
  published_at = undefined;
  created_at = Date.now();
  updated_at = Date.now();
  rules = {
    title_min: 2,
    title_max: 100,
    title_required: true,
    content_min: 2,
    content_max: 3000,
  };

  static async findAll() {
    const articles = await customQuery(
      "SELECT * FROM articles ORDER BY creation_date DESC"
    );
    return articles;
  }

  static async findById(id) {
    const article = await customQuery("SELECT * FROM articles WHERE id = ?", [
      id,
    ]);
    return article;
  }

  async delete(id) {
    await customQuery("DELETE * FROM articles WHERE id = ?", [id]);
  }

  async store() {}
}

module.exports = Article;
