module.exports = (req, res, next) => {
  if (!req.headers.cookie) {
    return res.status(401).send("Not auth!!");
  }
  next();
};
