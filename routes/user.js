const router = require("express").Router();
const {
  updateProfile,
  getUserProfile,
  updatePublicProfile,
  payment,
  paymentSuccess
  // paymentFullfillment,
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/update-profile").put(validateToken, updateProfile);
router.route("/get-user-profile").get(validateToken, getUserProfile);
router.route("/update-public-profile").put(validateToken, updatePublicProfile);
router.route("/payments").post(validateToken, payment);
router.route("/payment-success").post(validateToken, paymentSuccess);

// router.route("/stripe").post(paymentFullfillment);

// router.route("/verifyCredentials").post(verifyCredentials);
// router.route("/changePassword").put(changePassword);

module.exports = router;
