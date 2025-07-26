import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  name: String,
  text: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Story", storySchema);
