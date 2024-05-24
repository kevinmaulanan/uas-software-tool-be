const express = require("express");
const router = express.Router();

const ExperienceController = require("./Experience.controller");
const { AdminAuth } = require("../../middleware");
const { UploadImage } = require("../../middleware/upload");

router.get("/", ExperienceController.GetExperiences);
router.get("/:id", ExperienceController.FindExperience);
router.post(
  "/",
  UploadImage.single("image"),
  ExperienceController.CreateExperience
);
router.patch(
  "/:id",
  UploadImage.single("image"),
  ExperienceController.UpdateExperience
);
router.delete(
  "/:id",
  UploadImage.single("image"),
  ExperienceController.DeleteExperience
);

module.exports = router;
