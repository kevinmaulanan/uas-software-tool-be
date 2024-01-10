const express = require("express");
const router = express.Router();

const DetailPaymentController = require("./DetailPayment.controller");
const { UserAuth } = require("../../middleware");

router.patch("/:id", DetailPaymentController.DetailPaymentUpdate);

module.exports = router;
