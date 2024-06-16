require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET
    );
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(400).send("Error logging in");
  }
});

// Forgot password
router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  try {
    const token = crypto.randomBytes(20).toString("hex");
    const user = await User.findOneAndUpdate(
      { email },
      { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 },
      { new: true }
    );
    if (!user) return res.status(404).send("No user with that email");

    const transporter = nodemailer.createTransport({
      service: "SendGrid",
      auth: { user: "apikey", pass: "your_api_key" },
    });
    const mailOptions = {
      to: user.email,
      from: "passwordreset@yourapp.com",
      subject: "Password Reset",
      text: `Please click the following link to reset your password: http://${req.headers.host}/reset/${token}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send("Recovery email sent");
  } catch (error) {
    res.status(500).send("Error in sending email");
  }
});

// Reset password
router.post("/reset/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .send("Password reset token is invalid or has expired");
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).send("Password has been reset");
  } catch (error) {
    res.status(500).send("Error in resetting password");
  }
});

// Third-party login with Facebook
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// Third-party login with Twitter
router.get("/auth/twitter", passport.authenticate("twitter"));
router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
