const router = require("express").Router();
const { sendRequest, getRequest } = require("../controller/requestController");
const { isSeeker, isProvider } = require("../middleware/validateRole");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/send-request").post(validateToken, isSeeker, sendRequest);
router.route("/get-request").get(validateToken, isProvider, getRequest);

module.exports = router;
