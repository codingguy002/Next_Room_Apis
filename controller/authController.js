const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handleMsg = require("../ErrorHandling/handleMsg");
const register = async (req, res) => {
  console.log(req.body);
  try {
    const checkEmail = await User.findOne({
      email: req.body.email,
    });
    const checkMobile = await User.findOne({
      mobile: req.body.mobile,
    });
    if (checkMobile) {
      // throw new Error("Mobile Number already exist");
      handleMsg(res, "error", 404, null, "Mobile Number already exist");
      return;
    }
    if (checkEmail) {
      // throw new Error("email already exist");
      handleMsg(res, "error", 404, null, "email already exist");
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    if (req?.body?.firstname?.length < 5) {
      res.status(400).json({
        status: false,
        message: "FullName must be atleast 5 characters long",
      });
      return;
    }
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
      role: req.body.role,
    });
    await newUser.save();
    handleMsg(res, "success", 200, newUser, "");
  } catch (err) {
    console.log({ sayeenerrrrorrr: err.message });
    handleMsg(res, "error", 500, null, err.message);
  }
};

const login = async (req, res) => {
  try {
    console.log({ loginEmail: req.body.email });
    console.log({ loginFcm: req.body?.fcmToken });

    const user = await User.findOne({ email: req.body.email });
    console.log({ user });
    if (!user) {
      handleMsg(res, "error", 400, null, "Invalid email or password");
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
        req?.body?.fcmToken?.length > 0 ? req?.body?.fcmToken : null;

      //add new token
      user.token = accessToken;

      await user.save();
      console.log({ accessToken });
      const updatedUser = await User.findOne({ email: req.body.email });
      handleMsg(res, "success", 200, updatedUser, "");
    } else {
      handleMsg(res, "error", 400, null, "Invalid email or password");
    }
  } catch (err) {
    console.log({ errorfromcatch: err });
    handleMsg(res, "error", 500, null, err.message);
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

const allUser = async (req, res) => {
  try {
    const getAllUsers = await User.find({});
    handleMsg(res, "success", 200, getAllUsers);

  } catch (err) {
    handleMsg(res, "error", 500, null, err.message);

  }
};

module.exports = { register, login, verifyCredentials, changePassword,allUser };
