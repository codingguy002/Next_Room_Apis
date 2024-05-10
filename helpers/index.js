const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dc6rqrro5",
  api_key: "111979453399286",
  api_secret: "POLyatyuOo9zq_VyE1J9fA7ndn8",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NextRoom",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const parser = multer({ storage: storage });

module.exports = { parser };
