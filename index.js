const express = require("express");
const app = express();
const cors = require("cors");
const Stripe = require("stripe");

const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const PORT = process.env.PORT || 9000;
const authRouter = require("./routes/auth");
const listRouter = require("./routes/list");
const requestRouter = require("./routes/request");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const RoomSearchRouter = require("./routes/room_search");
const UserRouter = require("./routes/user");

const http = require("http").Server(app);
const io = require("socket.io")(http);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb databse is ready to use 🚀🚀");
  });

//stripe config

//MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.use("/stripe", express.raw({ type: "*/*" }));
// Enable CORS for all routes
app.use(cors());

app.use("/nextroom/api/auth", authRouter);
app.use("/nextroom/api/list", listRouter);
app.use("/nextroom/api/request", requestRouter);
app.use("/nextroom/api/chat", chatRouter);
app.use("/nextroom/api/message", messageRouter);
app.use("/nextroom/api/roomsearch", RoomSearchRouter);
app.use("/nextroom/api/user", UserRouter);

app.get("/nextroom/api", (req, res) => {
  res.send("Welcome To Next Room");
});

app.get("/nextroom/api/ping", (req, res) => {
  res.send({
    forceUpdate: false,
    url: "",
    appVersion: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log("Apis are working on port", PORT);
});

io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("current-message", (msg) => {
    console.log({ message: msg });
    io.emit("current-m", msg);
  });
});
http.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// MONGO_URL="mongodb+srv://nextroom:Abcd1234@cluster0.k45t03f.mongodb.net/?retryWrites=true&w=majority"
