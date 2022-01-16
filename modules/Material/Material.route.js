const express = require("express");
const router = express.Router();

const MaterialController = require("./Material.controller");
const { UserAuth } = require("../../middleware");

router.get("/", UserAuth, MaterialController.MaterialList);
router.get("/:id", UserAuth, MaterialController.MaterialDetail);
router.post("/create", UserAuth, MaterialController.MaterialCreated);

module.exports = router;
