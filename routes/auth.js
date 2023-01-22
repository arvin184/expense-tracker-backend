const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/authController");

router.post(
  "/signup",
  [
    body("username", "Username can't be empty").exists().trim().escape(),
    body("email", "Email invalid").isEmail().trim().escape(),
    body("password", "Password can't be empty").exists().trim().escape(),
  ],
  authController.signup
);
router.post("/login", authController.login);

module.exports = router;
