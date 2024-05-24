const express = require("express");
const router = express.Router();

const UserController = require("./User.controller");
const { AdminAuth } = require("../../middleware");

router.get("/", UserController.UserList);
router.get("/patient", UserController.PatientList);
router.get("/:id", UserController.UserDetail);
router.post("/login", UserController.Login);
router.post("/", UserController.Register);
router.post("/create", UserController.CreateUser);
router.patch("/:id", UserController.UpdateUser);
router.delete("/:id", UserController.DeleteUser);

module.exports = router;
