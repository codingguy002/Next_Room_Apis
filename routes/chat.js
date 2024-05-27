const router = require("express").Router();
const { createChat, myChats } = require("../controller/chatController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/createChat").post(validateToken, createChat);
router.route("/myChats").post(validateToken, myChats);

module.exports = router;
