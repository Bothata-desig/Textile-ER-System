import express from "express";
import Activity from "../models/Activity";
const router = express.Router();

// Get activities by department
router.get("/department/:department", async (req, res) => {
  const activities = await Activity.find({ department: req.params.department });
  res.json(activities);
});

// (Optional) Add new activity
router.post("/", async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

export default router;