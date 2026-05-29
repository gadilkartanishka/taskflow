const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// SIGNUP
router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res
        .status(201)
        .json({
          token,
          user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

// LOGIN
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res
        .status(200)
        .json({
          token,
          user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

module.exports = router;
