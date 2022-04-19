const Sequelize = require("sequelize");

const sequelize = new Sequelize("photodata", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
