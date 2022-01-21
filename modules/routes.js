const express = require("express");
const router = express.Router();

router.use("/user", require("./User/User.route"));
router.use("/category", require("./Category/Category.route"));
router.use("/subcategory", require("./SubCategory/SubCategory.route"));
router.use("/material", require("./Material/Material.route"));

module.exports = router;
