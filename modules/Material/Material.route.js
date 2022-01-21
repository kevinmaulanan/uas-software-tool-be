const express = require("express");
const router = express.Router();

const MaterialController = require("./Material.controller");
const { UserAuth } = require("../../middleware");

// router.get("/", UserAuth, MaterialController.MaterialList);
router.get("/detail/:id", UserAuth, MaterialController.MaterialDetail);
router.get("/:id", UserAuth, MaterialController.MaterialListByCategory);
router.post("/create", UserAuth, MaterialController.MaterialCreated);

module.exports = router;
