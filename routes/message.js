const router = require("express").Router();
const { sendMessage, myMessages } = require("../controller/messageController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/sendMessage").post(validateToken, sendMessage);
router.route("/myMessages").post(validateToken, myMessages);

module.exports = router;
