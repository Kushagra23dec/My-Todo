const express = require("express");
const userController = require("../controller/user-controller");

const router = express.Router();

router
  .post("/login", userController.login)
  .post("/signup", userController.signup);

exports.router = router;
