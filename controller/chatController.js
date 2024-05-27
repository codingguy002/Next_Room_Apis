const Chat = require("../model/chat");

const handleMsg = require("../ErrorHandling/handleMsg");

const createChat = async (req, res) => {
  const { userId } = req.body;
  console.log(req.user);
  const userIds = [req.user._id, userId];

  try {
    const chat = await Chat.findOne({
      users: { $all: userIds },
      type: "private",
    });
    if (chat) {
      handleMsg(res, "success", 200, chat, "");
      return;
    }
    const newChat = await Chat.create({
      users: userIds,
    });
    handleMsg(res, "success", 200, newChat, "");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

const myChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: req.user._id,
    }).populate({
      path: "users",
      select: ["fullname", "image"],
      match: { _id: { $ne: req.user._id } },
    });
    handleMsg(res, "success", 200, chats, "");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

module.exports = { createChat, myChats };
