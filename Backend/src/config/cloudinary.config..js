const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  timeout: 120000,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    folder: "Product",
    // filename: function (req, file, cb) {
    //   cb(null, file.originalname);
    // },
    format: async (req, file) => "jpg",
    public_id: (req, file) =>
      file.originalname.split(".")[0] + "_" + Date.now(),
  },
  transformation: [{ with: 500, height: 500, crop: "limit" }],
});
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
