const router = require("express").Router();
const {
  requestRoomSearch,
  getRoomSearch,
} = require("../controller/RoomSearchController");
const { isSeeker, isProvider } = require("../middleware/validateRole");
const validateToken = require("../middleware/validateTokenHandler");

router
  .route("/request-room-search")
  .post(validateToken, isSeeker, requestRoomSearch);
router.route("/get-room-search").get(validateToken, getRoomSearch);

module.exports = router;
