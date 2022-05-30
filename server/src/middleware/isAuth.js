module.exports = (req, res, next) => {
  if (req.body.name == "name") {
    return res.status(401).send("Name not valid!");
  }
  if (!req.headers.cookie) {
    return res.status(401).send("Not auth!!");
  }
  next();
};
