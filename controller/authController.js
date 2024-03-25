const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const checkEmail = await User.findOne({
      email: req.body.email,
    });
    const checkMobile = await User.findOne({
      mobile: req.body.mobile,
    });
    if (checkMobile) {
      throw new Error("Mobile Number already exist");
    }
    if (checkEmail) {
      throw new Error("email already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    if (req?.body?.username?.length < 5) {
      res.status(400).json({
        status: false,
        message: "Username must be atleast 5 characters long",
      });
      return;
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
      role: req.body.role,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log({ err: err });
    res
      .status(500)
      .json({ status: false, message: err.message, statuscode: 500 });
  }
};

const login = async (req, res) => {
  try {
    console.log({ loginEmail: req.body.email });
    console.log({ loginFcm: req.body?.fcmToken });

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Please Create Your Account",
        statuscode: 400,
      });
    }

    const validatePass = await bcrypt.compare(req.body.password, user.password);
    if (validatePass) {
      //remove the old token
      user.token = "";
      user.fcmToken = "";

      //generate new token
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "90000000000000h",
      });
      user.fcmToken =
        req?.body?.fcmToken?.length > 0 ? req?.body?.fcmToken : "";

      //add new token
      user.token = accessToken;
      await user.save();
      const updatedUser = await User.findOne({ email: req.body.email });

      res.status(200).json(updatedUser);
    } else {
      res.status(400).json({
        status: false,
        message: "Invalid Email or password",
        statuscode: 400,
      });
    }
  } catch (err) {
    console.log({ errorfromcatch: err });
    res
      .status(500)
      .json({ status: false, message: err.message, statuscode: 500 });
  }
};

const verifyCredentials = async (req, res) => {
  try {
    const checkEmail = await User.findOne({
      email: req.body.email,
    });
    const checkMobile = await User.findOne({
      mobile: req.body.mobile,
    });
    if (checkMobile) {
      throw new Error("Mobile Number already exist");
    } else if (checkEmail) {
      throw new Error("email already exist");
    } else {
      res
        .status(200)
        .json({ status: true, message: "Verified", statuscode: 200 });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: false, message: e.message, statuscode: 500 });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res.status(200).json({
      status: true,
      message: "Password Update Successfully",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: false, message: err.message, statuscode: 500 });
  }
};

module.exports = { register, login, verifyCredentials, changePassword };
