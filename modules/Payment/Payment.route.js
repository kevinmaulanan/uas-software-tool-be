const express = require("express");
const router = express.Router();

const PaymentController = require("./Payment.controller");
const { UserAuth } = require("../../middleware");

router.get("/", PaymentController.PaymentList);
router.get("/user/:id", PaymentController.PaymentListByUserId);
router.get("/:id", PaymentController.PaymentDetail);
router.post("/", PaymentController.PaymentCreate);

module.exports = router;
