const router = require("express").Router();
const oauth_controller = require("../controller/oauth_controller");

const passport = require("passport");

router.post("/cookie", oauth_controller.insertCookie);
router.get("/login/success", (req, res) => {
  console.log("buraya");
  if (req.user) {
    // res.status(200).json({
    //   user: req.user,
    //   cookies: req.cookies,
    // })
  }
  console.log(req);
  res.cookie("a", "b", { maxAge: 1000 * 60 * 60 });
  res.redirect("http://localhost:3000/home");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    successRedirect: "http://localhost:8080/auth/login/success",
    failureRedirect: "/basarisiz",
  })
);

module.exports = router;
