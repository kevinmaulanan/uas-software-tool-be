const express = require("express");
const router = express.Router();

const ClientController = require("./Client.controller");
const { AdminAuth } = require("../../middleware");
const { UploadImage } = require("../../middleware/upload");

router.get("/", ClientController.GetClients);
router.get("/:id", ClientController.FindClient);
router.post("/", UploadImage.single("image"), ClientController.CreateClient);
router.patch(
  "/:id",
  UploadImage.single("image"),
  ClientController.UpdateClient
);
router.delete(
  "/:id",
  UploadImage.single("image"),
  ClientController.DeleteClient
);

module.exports = router;
