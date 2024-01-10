const express = require("express");
const router = express.Router();

const UserController = require("./User.controller");
const { UserAuth } = require("../../middleware");

router.get("/", UserController.UserList);
router.get("/:id", UserController.UserDetail);
router.post("/login", UserController.Login);
router.post("/", UserController.Register);

module.exports = router;
