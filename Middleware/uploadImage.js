const multer = require("multer");
const path = require("path");

// path to save the image and change image name.
const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

// choose the extension of the image
const imagefileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Bad image format"), false);
  }
  cb(null, true);
};

// Upload Image
const uploadImage = multer({
  storage: storageDisk,
  fileFilter: imagefileFilter,
  limits: 2 * 1024 * 1024, // 2MB
});

module.exports = uploadImage;
