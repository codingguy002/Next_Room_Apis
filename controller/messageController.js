const Message = require("../model/message");
const Chat = require("../model/chat");

const handleMsg = require("../ErrorHandling/handleMsg");

const sendMessage = async (req, res) => {
  const { chatId, text } = req.body;
  const senderId = req.user._id;
  try {
    const newMessage = await Message.create({
      chatId,
      text,
      senderId: senderId,
    });
    await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: text,
      },
      {
        new: true,
      }
    );
    handleMsg(res, "success", 200, newMessage, "");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};
const myMessages = async (req, res) => {
  const { chatId } = req.body;
  try {
    const messages = await Message.find({
      chatId: chatId,
    }).populate({
      path: "senderId",
      select: ["fullname", "image"],
    });
    handleMsg(res, "success", 200, messages, "");
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

module.exports = { sendMessage, myMessages };
