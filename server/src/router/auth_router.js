const router = require("express").Router();
const auth_controller = require("../controller/auth_controller");

router.post("/login", auth_controller.login);
router.post("/register", auth_controller.register);
router.get("/photoadd", auth_controller.photoAdd);

module.exports = router;
