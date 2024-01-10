const express = require("express");
const router = express.Router();

const SemesterController = require("./Semester.controller");
const { UserAuth } = require("../../middleware");

router.get("/", SemesterController.SemesterList);
router.post("/", SemesterController.SemesterCreate);
// router.patch("/", SemesterController.SemesterUpdate);

module.exports = router;
