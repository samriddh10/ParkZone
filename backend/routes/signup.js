// routes/signup.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Owner = require("../models/Owner");

router.post("/signup", async (req, res) => {
  const { name, dob, phone, gender, email, password, signUpType } = req.body;

  try {
    if (signUpType === "User") {
      const newUser = new User({ name, dob, phone, gender, email, password });
      await newUser.save();
      return res.status(201).json({ message: "User profile created" });
    } else if (signUpType === "Owner") {
      const newOwner = new Owner({ name, dob, phone, gender, email, password });
      await newOwner.save();
      return res.status(201).json({ message: "Owner profile created" });
    } else {
      return res.status(400).json({ error: "Invalid signup type" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Signup failed" });
  }
});

module.exports = router;
