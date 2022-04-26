const jwt = require("jsonwebtoken");
const user = require("../config/model");
const photo = require("../config/photoModel");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const userOne = await user.findOne({
    where: {
      email: req.body.email,
    },
  });
  const controlPassword = await bcrypt.compare(
    req.body.password,
    userOne.password
  );
  if (userOne) {
    if (controlPassword) {
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
        httpOnly: true,
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const token = jwt.sign({ username: req.body.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  if (!userCheck) {
    const user1 = await user
      .create({
        email: req.body.email,
        password: hashedPassword,
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

const getPhoto = async (req, res) => {
  console.log("fotograf aldı");
  await photo
    .findAll({ where: { name: req.body.name } })
    .then(async (result) => {
      const dizi = [];
      for (const i of result) {
        const data = await fs.promises.readFile(i.photo, "utf-8");
        dizi.push(data);
      }
      res.json(dizi);
    })
    .catch((err) => console.log(err));
};

const uploadPhoto = async (req, res) => {
  const uniqueId = crypto.randomUUID();
  const path = `/home/fatih/Documents/photoGallery1.0/server/src/images/${uniqueId}.txt`;
  fs.writeFile(path, req.body.photo, (err) => {
    console.log(err);
  });
  await photo.create({
    name: req.body.name,
    photo: path,
  });
  res.end();
};

const checkCookie = async (req, res) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
    res.send("false");
  } else {
    const token = cookie.split("access_token=")[1].split(";")[0];
    try {
      const check = jwt.verify(token, process.env.SECRET_KEY);
      const userCookie = await user.findOne({
        where: { email: check.username },
      });
      if (userCookie.token === token) {
        res.send("true");
      } else {
        res.send("false");
      }
    } catch (err) {
      console.log(err);
      res.send("false");
    }
  }
};

module.exports = {
  login,
  register,
  getPhoto,
  checkCookie,
  uploadPhoto,
};
