import express from "express";
import Story from "../models/Story";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
});

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, text } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // Remove local file

    const story = await Story.create({
      name,
      text,
      imageUrl: result.secure_url,
    });

    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

router.get("/", async (_req, res) => {
  const stories = await Story.find().sort({ createdAt: -1 });
  res.json(stories);
});

export default router;
