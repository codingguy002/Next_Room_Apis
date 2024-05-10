const router = require("express").Router();
const { sendRequest } = require("../controller/requestController");
const { isSeeker } = require("../middleware/validateRole");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/send-request").post(validateToken, isSeeker,sendRequest);

module.exports = router;
