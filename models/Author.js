const { Sequelize, Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("author", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Author;
};
