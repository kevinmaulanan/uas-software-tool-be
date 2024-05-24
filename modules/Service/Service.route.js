const express = require("express");
const router = express.Router();

const ServiceController = require("./Service.controller");
const { AdminAuth } = require("../../middleware");
const { UploadImage } = require("../../middleware/upload");

router.get("/", ServiceController.GetServices);
router.get("/:id", ServiceController.FindService);
router.post("/", UploadImage.single("image"), ServiceController.CreateService);
router.patch(
  "/:id",
  UploadImage.single("image"),
  ServiceController.UpdateService
);
router.delete(
  "/:id",
  UploadImage.single("image"),
  ServiceController.DeleteService
);

module.exports = router;
