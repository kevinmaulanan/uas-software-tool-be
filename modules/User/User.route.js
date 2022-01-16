const express = require("express");
const router = express.Router();

const UserController = require("./User.controller");
const { UserAuth } = require("../../middleware");

router.get("/profile", UserAuth, UserController.Profile);
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);

module.exports = router;
