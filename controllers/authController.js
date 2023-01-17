const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const JWT_SECRET = "a@184*184!";

const signup = async (req, res, next) => {
 try{
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success:false,status:errors.errors[0].msg});
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
    password: hash
  });

  let data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, JWT_SECRET);

  return res.status(200).json({ success: true,status:"Sign up successful","auth-token": token });
 }
 catch(err)
 {
  console.log(err)
  return res.status(500).json({"status":"Internal Error"});
 }
};

const login = async (req, res, next) => {
  try {
    let email = req.body.email || "";
    let password = req.body.password || "";
    email = email.trim();
    password = password.trim();
    
    if(email.length==0 || password.length==0)
    {
    return res.status(400).json({success:false,status:"Empty input field"});

    }

    let user = await User.findOne({ email: email });
    if (!user) {
      
    return res.status(400).json({success:false,status:"email doesn't exists"});
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
        .json({ success: true, username: user.username, "auth-token": token,status:"Login successful" });
    } else {
      return res
        .status(401)
        .json({ success: false, status: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signup, login };
