import express, { Request, Response } from "express";
import User from "../models/User";
const router = express.Router();

// Create new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Could not create user", details: err });
  }
});

// Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Update user by ID
router.put("/:id", async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

export default router;