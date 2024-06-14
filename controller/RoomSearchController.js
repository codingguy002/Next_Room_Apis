const Room = require("../model/RoomSearch");

const handleMsg = require("../ErrorHandling/handleMsg");

const {
  admin,
  userServiceAccount,
  sendNotificationUsingApp,
} = require("../firebase/index");

const NextRoomApp = admin.initializeApp(
  {
    credential: admin.credential.cert(userServiceAccount),
  },
  "NextRoom0"
);

const requestRoomSearch = async (req, res) => {
  try {
    const id = req.user._id;
    const room = { ...req.body };
    room.user_id = id;
    console.log({ room });
    const newRoom = new Room({
      ...room,
    });
    await newRoom.save();
    handleMsg(res, "success", 200, null, "Room Request Successfully");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

const getRoomSearch = async (req, res) => {
  try {
    const filter = {};
    console.log(req.query, "params");
    if (req?.query?.id?.length > 0) {
      filter.user_id = req.query.id;
    }
    const room = await Room.find(filter);
    handleMsg(res, "success", 200, room, "");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

module.exports = { requestRoomSearch, getRoomSearch };
