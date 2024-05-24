const express = require("express");
const router = express.Router();

const ArticleController = require("./Article.controller");
const { AdminAuth } = require("../../middleware");
const { UploadImage } = require("../../middleware/upload");

router.get("/", ArticleController.GetArticles);
router.get("/:id", ArticleController.FindArticle);
router.post("/", UploadImage.single("image"), ArticleController.CreateArticle);
router.patch(
  "/:id",
  UploadImage.single("image"),
  ArticleController.UpdateArticle
);
router.delete(
  "/:id",
  UploadImage.single("image"),
  ArticleController.DeleteArticle
);

module.exports = router;
