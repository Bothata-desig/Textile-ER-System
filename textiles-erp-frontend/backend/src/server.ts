import express from "express";
import connectDB from "./db";
import userRoutes from "./routes/user";
import activityRoutes from "./routes/activity";

connectDB();

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});