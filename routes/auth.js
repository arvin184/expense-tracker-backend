const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/authController");

router.post(
  "/signup",
  [
    body("username", "Username: minimum 3 characters").isLength({ min: 3 }),
    body("email", "Email: invalid email").isEmail(),
    body("password", "Password: minimum 3 characters").isLength({ min: 3 }),
  ],
  authController.signup
);
router.post("/login", authController.login);

module.exports = router;
