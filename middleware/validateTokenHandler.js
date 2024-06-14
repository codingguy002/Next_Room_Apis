const jwt = require("jsonwebtoken");
const User = require("../model/User");
const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  try {
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            console.log("error", err);
            res
              .status(401)
              .json({ status: false, msg: "Token Expired", code: 401 });
            // throw new Error("Token Expired");
            return;
          }
          req.user = decoded.user;

          const findUser = await User.findById({ _id: req.user._id });

          if (findUser?.token !== token) {
            res
              .status(401)
              .json({ status: false, msg: "Unauthorized", code: 401 });
            return;
          }
          next();
        }
      );
    } else {
      res.status(401).json({ status: false, msg: "Token Missing", code: 401 });
      return;
    }
  } catch (e) {
    console.log({ e });
    res.status(401).json({ status: false, msg: e.message, code: 401 });
  }
};

module.exports = validateToken;
