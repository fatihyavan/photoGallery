const jwt = require("jsonwebtoken");
const user = require("../config/model");
const photo = require("../config/photoModel");

const login = async (req, res) => {
  const userOne = await user.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userOne) {
    if (userOne.password === req.body.password) {
      const token = jwt.sign(
        { username: req.body.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      await user.update({ token: token }, { where: { email: req.body.email } });
      res.cookie("access_token", token, {
        maxAge: 1000 * 60 * 60,
        //  httpOnly: true,
      });
      res.send({ auth: "Success" });
    } else {
      console.log("degilll");
      res.send({ message: "Password is incorrect" });
    }
  } else {
    res.send({ message: "User not found" });
  }
};

const register = async (req, res) => {
  const userCheck = await user.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!userCheck) {
    const user1 = await user
      .create({
        email: req.body.email,
        password: req.body.password,
        isAdmin: "false",
        token: token,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
    console.log(token);
  } else {
    res.send("Kullanici var yeni email dene");
  }
};

const photoAdd = async (req, res) => {
  const photo1 = await photo.create({
    name: "fatihee@gmail.com",
    photo: "/home/fatih/Documents/photoData/1.jpg",
  });
};

const photoGet = async (req, res) => {
  const photo2 = await photo.findOne({ where: { name: "fatihee@gmail.com" } });
};

const checkCokkie = async (req, res) => {
  if (req.headers.cookie) {
    const b = req.headers.cookie.split(" ", 1);
    res.send(b);
  }
};

module.exports = { login, register, photoAdd, photoGet, checkCokkie };
