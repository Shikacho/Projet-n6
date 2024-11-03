const multer = require("multer");

const MIMETYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "tmp");
  },
  filename: (req, file, callback) => {
    let name = Buffer.from(file.originalname, "latin1")
      .toString("utf8")
      .split(" ")
      .join("")
      .toLowerCase();
    const extension = MIMETYPES[file.mimetype];
    name = name.replace("." + extension, "");
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");