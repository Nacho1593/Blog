module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
    },
  });

  return Comment;
};
