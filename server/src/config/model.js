const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./database");

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "false",
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {}
);
(async () => {
  user.sync({ alter: true });
})();

module.exports = user;
