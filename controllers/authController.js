const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const JWT_SECRET = "a@184*184!";

const signup = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  let email = await User.findOne({ email: req.body.email });
  if (email) {
    return res
      .status(401)
      .json({ success: false, status: "Email already exists" });
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password.trim(), salt);

  let user = await User.create({
    email: req.body.email.trim(),
    username: req.body.username.trim(),
    password: hash,
  });

  let data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, JWT_SECRET);

  return res.status(200).json({ success: true, "auth-token": token });
};

const login = async (req, res, next) => {
  try {
    let email = req.body.email || "";
    let password = req.body.password || "";
    email = email.trim();
    password = password.trim();
    let errors = {};

    let user = await User.findOne({ email: email });
    if (!user) {
      errors = {
        errors: [
          {
            value: req.body.email,
            msg: "Email doesn't exists",
            param: "email",
            location: "body",
          },
        ],
      };
      return res.status(400).json(errors);
    }

    let hashPW = user.password;

    if (bcrypt.compareSync(password, hashPW)) {
      let data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, JWT_SECRET);

      return res
        .status(200)
        .json({ success: true, username: user.username, "auth-token": token });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signup, login };
