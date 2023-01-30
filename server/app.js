const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/database");
const bodyParser = require("body-parser");
const cokkieParser = require("cookie-parser");
const passport = require("passport");

// const session = require("express-session");
const passportGoogle = require("../server/src/config/passportGoogle");

// const cookieSession = require("cookie-session");

const auth_router = require("./src/router/auth_router");
const oauth_router = require("./src/router/oauth_router");

// app.use(
//   session({
//     secret: "somethingsecretgoeshere",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

// app.use(cookieSession({ maxAge: 1000 * 60 * 60, keys: "a" }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    withCredentials: true,
  })
);

app.use(cokkieParser());

app.use("/", auth_router);
app.use("/auth", oauth_router);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.listen(process.env.PORT, () => {
  console.log(`server has alive ${process.env.PORT}`);
});
