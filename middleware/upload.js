const multer = require("multer");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName =
      "image/" +
      Date.now().toString() +
      "-" +
      file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

exports.UploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
    // if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    //   cb(null, true);
    // } else {
    //   cb(null, false);
    //   return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    // }
  },
});
