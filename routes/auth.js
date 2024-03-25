const router = require("express").Router();
const {
  register,
  login,
  verifyCredentials,
  changePassword
} = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verifyCredentials").post(verifyCredentials);
router.route("/changePassword").put(changePassword);


module.exports = router;
