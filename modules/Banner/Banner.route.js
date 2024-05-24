const express = require("express");
const router = express.Router();

const BannerController = require("./Banner.controller");
const { AdminAuth } = require("../../middleware");
const { UploadImage } = require("../../middleware/upload");

router.get("/", BannerController.GetBanners);
router.get("/:id", BannerController.FindBanner);
router.post("/", UploadImage.single("image"), BannerController.CreateBanner);
router.patch(
  "/:id",
  UploadImage.single("image"),
  BannerController.UpdateBanner
);
router.delete(
  "/:id",
  UploadImage.single("image"),
  BannerController.DeleteBanner
);

module.exports = router;
