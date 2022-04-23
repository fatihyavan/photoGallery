const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./database");

const photo = sequelize.define(
  "photo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photoname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);
(async () => {
  photo.sync({ alter: true });
})();

module.exports = photo;
