module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("author", {
    fulllName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Author;
};
