const multer = require("multer");
const path = require("path");

const {
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
} = require("../constants/app.constants");
const { BadRequestError } = require("../core/error.response");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../assets/images"), // path save image on folder
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype)) {
    return cb(new BadRequestError("Định dạng file không hợp lệ !"));
  }
  cb(null, true);
};

const uploadMulter = multer({
  storage,
  fileFilter,
  limits: { fieldSize: MAX_FILE_SIZE },
}).array("albums", MAX_FILES_UPLOAD);

module.exports = uploadMulter;
