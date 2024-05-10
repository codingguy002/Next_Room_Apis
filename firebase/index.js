// //user side account

const admin = require("firebase-admin");
const userServiceAccount = require("../nextroom-fdfc4-firebase-adminsdk-p4s6m-f92fb0ffee.json"); // Path to your service account key JSON file

function sendNotificationUsingApp(firebaseApp, recipientToken, message) {
  firebaseApp
    .messaging()
    .sendToDevice(recipientToken, message)
    .then((response) => {
      console.log("Successfully sent notification:", response);
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
}
module.exports = {
  sendNotificationUsingApp,
  admin,
  userServiceAccount,
};
