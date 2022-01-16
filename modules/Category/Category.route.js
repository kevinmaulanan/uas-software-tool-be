const express = require("express");
const router = express.Router();

const CategoryController = require("./Category.controller");
const { UserAuth } = require("../../middleware");

router.get("/", CategoryController.CategoryList);
router.get("/:id", CategoryController.CategoryDetail);
router.post("/create", UserAuth, CategoryController.CategoryCreated);

module.exports = router;
