const express = require("express");
const app = express();
const cors = require("cors");

const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const PORT = process.env.PORT || 8080;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb databse is ready to use 🚀🚀");
  });

//MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// Enable CORS for all routes
app.use(cors());

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

// MONGO_URL="mongodb+srv://nextroom:Abcd1234@cluster0.k45t03f.mongodb.net/?retryWrites=true&w=majority"