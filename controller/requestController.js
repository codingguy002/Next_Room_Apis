const List = require("../model/List");
const User = require("../model/User");
const Request = require("../model/Request");

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
  "NextRoom"
);

const sendRequest = async (req, res) => {
  try {
    console.log({ body: req.body });
    const { listId } = req.body;
    const userId = req.user?._id;
    console.log({ userId });
    const findListForRequest = await Request.find({ listId });
    const list = await List.findById({ _id: listId });
    const posterUserData = await User.findById({ _id: list.userId });
    console.log({ findListForRequest });

    // if (findListForRequest === null) {
    // const userIds = [];
    // userIds.push(userId);
    const userr = findListForRequest.filter((item, index) => {
      console.log({ post: item.userId });
      console.log({ userId });
      // if (userId === item.userId) {
      //   return item.userId;
      // }
      return userId == item.userId;
    });
    console.log({ userr });
    // console.log({ length: userr.length }, userr[0]);
    if (userr.length > 0) {
      handleMsg(
        res,
        "error",
        400,
        null,
        "You already have requested for this room"
      );
    } else {
      const newReq = new Request({
        listData: list,
        listId: listId,
        userId: userId,
        posterPersonId: posterUserData._id,
        posterData: posterUserData,
        request_details: req.body.request_details,
      });
      await newReq.save();
      // }
      // else {
      //   findListForRequest.userId.push(userId);
      //   await findListForRequest.save();
      // }

      const messageForUser = {
        notification: {
          title: "Alert",
          body: "Request has been sent to the admin",
        },
      };
      const messageForPostCreater = {
        notification: {
          title: "New Request",
          body: `${req?.user?.fullname} has requested to your listing`,
        },
      };

      if (posterUserData.fcm_token !== null) {
        sendNotificationUsingApp(
          NextRoomApp,
          posterUserData.fcm_token,
          messageForPostCreater
        );
      }
      if (req?.user?.fcm_token !== null) {
        sendNotificationUsingApp(
          NextRoomApp,
          req.user.fcmToken,
          messageForUser
        );
      }
      handleMsg(res, "success", 200, null, "Request Sent successfully");
    }
  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);
  }
};

const getRequest = async (req, res) => {
  const userId = req.user?._id;
  console.log(req.user?._id);

  const allList = await Request.find({ posterPersonId: userId });
  // console.log({ allList });
  handleMsg(res, "success", 200, allList, "List Fetched");
};

module.exports = { sendRequest, getRequest };
