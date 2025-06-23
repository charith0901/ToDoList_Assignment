import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  tags: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
