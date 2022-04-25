const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/database");
const bodyParser = require("body-parser");
const cokkieParser = require("cookie-parser");

const auth_router = require("./src/router/auth_router");

app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cokkieParser());

app.use("/", auth_router);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.listen(process.env.PORT, () => {
  console.log(`server has alive ${process.env.PORT}`);
});
