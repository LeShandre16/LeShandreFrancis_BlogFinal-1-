import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { seedPosts } from "../utils/seedPosts.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashed, isAdmin });

  if (user.isAdmin) await seedPosts(user._id);

  res.json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user });
});

export default router;
