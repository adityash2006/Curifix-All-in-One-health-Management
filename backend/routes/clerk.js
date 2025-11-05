// routes/clerkWebhook.js
import express from "express";
import User from "../models/User.js";
import { Webhook } from "svix"; // Clerk sends webhooks using Svix

const router = express.Router();

// Clerk sends a signature header to verify authenticity
router.post("/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  const payload = req.body;
  const headers = req.headers;
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    const evt = wh.verify(payload, headers);

    if (evt.type === "user.created") {
  const data = evt.data;
  const newUser = new User({
    userId: data.id,  // Clerk ID
    username: data.username || "",
    firstName: data.first_name || "",
    lastName: data.last_name || "",
    email: data.email_addresses?.[0]?.email_address || "",
    profileImage: data.image_url || "",
     
   
  });

  await newUser.save();
}


    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    res.status(400).json({ error: "Invalid signature" });
  }
});

export default router;
