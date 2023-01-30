const { response } = require("express");
const jwt = require("jsonwebtoken");
const user = require("../config/model");
const { OAuth2Client } = require("google-auth-library");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;

const insertCookie = async (req, res) => {
  console.log("insertteyim");
  console.log(req.body.email);
  const userCheck = await user.findOne({ where: { email: req.body.email } });
  if (!userCheck) {
    await user
      .create({
        email: req.body.email,
        password: "GooglePassword",
        isAdmin: "false",
        token: req.body.email,
      })
      .then()
      .catch((err) => console.log(err));
  }

  res;
};

module.exports = { insertCookie };
