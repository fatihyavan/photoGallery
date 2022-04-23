const router = require("express").Router();
const auth_controller = require("../controller/auth_controller");

router.post("/login", auth_controller.login);
router.post("/register", auth_controller.register);
router.post("/getphoto", auth_controller.getPhoto);
router.post("/uploadphoto", auth_controller.uploadPhoto);

module.exports = router;
