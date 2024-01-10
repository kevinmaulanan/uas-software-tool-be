const express = require("express");
const router = express.Router();

router.use("/users", require("./User/User.route"));
router.use("/semesters", require("./Semester/Semester.route"));
router.use("/payments", require("./Payment/Payment.route"));
router.use("/detail-payments", require("./DetailPayment/DetailPayment.route"));

module.exports = router;
