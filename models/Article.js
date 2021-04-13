module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.BLOB,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
  });

  return Article;
};
