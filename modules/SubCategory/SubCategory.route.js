const express = require("express");
const router = express.Router();

const SubCategoryController = require("./SubCategory.controller");
const { UserAuth } = require("../../middleware");

router.get("/", SubCategoryController.SubCategoryList);
router.get("/:id", SubCategoryController.SubCategoryDetail);
router.post("/create", UserAuth, SubCategoryController.SubCategoryCreated);

module.exports = router;
