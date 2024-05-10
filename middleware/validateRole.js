const isProvider = (req, res, next) => {
  // Check the role of the user (admin or user)
  if (req.user.role === "provider") {
    // If the user is an admin, allow access
    return next();
  } else {
    // If not an admin, deny access
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized, action not granted" });
  }
};
const isSeeker = (req, res, next) => {
  // Check the role of the user (admin or user)
  if (req.user.role === "seeker") {
    // If the user is an admin, allow access
    return next();
  } else {
    // If not an admin, deny access
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized, action not granted" });
  }
};

module.exports = { isProvider, isSeeker };
