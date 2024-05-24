const express = require("express");
const router = express.Router();

router.use("/users", require("./User/User.route"));
router.use("/services", require("./Service/Service.route"));
router.use("/articles", require("./Article/Article.route"));
router.use("/banners", require("./Banner/Banner.route"));
router.use("/clients", require("./Client/Client.route"));
router.use("/experiences", require("./Experience/Experience.route"));
router.use("/galery-photos", require("./GaleryPhoto/GaleryPhoto.route"));

module.exports = router;
