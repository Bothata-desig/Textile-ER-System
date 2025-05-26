import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  department: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;