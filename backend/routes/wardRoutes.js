// routes/wardRoutes.js
import express from "express";
import { Ward } from "../models/Meetings.js";

const router = express.Router();

// 🟢 Add ward (start meeting)
router.post("/start", async (req, res) => {
  try {
    const { wardId } = req.body;
    const existing = await Ward.findOne({ wardId });
    if (existing) return res.status(200).json({ message: "Ward already active" });

    const ward = new Ward({ wardId });
    await ward.save();
    res.status(201).json({ message: "Ward added", ward });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 Remove ward (end meeting)
router.delete("/end/:wardId", async (req, res) => {
  try {
    await Ward.findOneAndDelete({ wardId: req.params.wardId });
    res.json({ message: "Ward ended and removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟡 Get all active wards
router.get("/", async (req, res) => {
  try {
    const wards = await Ward.find().sort({ startedAt: -1 });
    res.json(wards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
