const router = require("express").Router();
const auth_controller = require("../controller/auth_controller");
const isAuth = require("../middleware/isAuth");

router.post("/login", auth_controller.login);
router.post("/register", auth_controller.register);
router.post("/getphoto", isAuth, auth_controller.getPhoto);
router.post("/uploadphoto", isAuth, auth_controller.uploadPhoto);
router.post("/checkcookie", auth_controller.checkCookie);

module.exports = router;
