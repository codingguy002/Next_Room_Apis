const handleMsg = (res, type, code, data = null, msg = "") => {
  if (type == "success") {
    return res.status(code).json({
      data,
      msg,
      code,
      status: true,
    });
  } else {
    return res.status(code).json({
      msg,
      code,
      status: false,
    });
  }
  return;
};

module.exports = handleMsg;
