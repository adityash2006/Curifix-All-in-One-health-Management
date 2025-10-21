import express from "express";
import { getresponsefromai } from "../utils/ai.js";

const router = express.Router();

router.post("/health-plan", async (req, res) => {
  const { age, gender, weight, height, dietary, goal } = req.body;
  const prompt = `Generate a personalized health plan for a ${age}-year-old ${gender} who is ${height} cm tall and weighs ${weight} kg. Their dietary restrictions are ${dietary} and their health goal is to ${goal}.`;
  const response = await getresponsefromai(prompt);
  res.send(response);
});

export default router;
