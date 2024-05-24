const express = require("express");
const router = express.Router();

const GaleryPhotoController = require("./GaleryPhoto.controller");
const { AdminAuth } = require("../../middleware");
const { UploadImage } = require("../../middleware/upload");

router.get("/", GaleryPhotoController.GetGaleryPhotos);
router.get("/:id", GaleryPhotoController.FindGaleryPhoto);
router.post(
  "/",
  UploadImage.single("image"),
  GaleryPhotoController.CreateGaleryPhoto
);
router.patch(
  "/:id",
  UploadImage.single("image"),
  GaleryPhotoController.UpdateGaleryPhoto
);
router.delete(
  "/:id",
  UploadImage.single("image"),
  GaleryPhotoController.DeleteGaleryPhoto
);

module.exports = router;
